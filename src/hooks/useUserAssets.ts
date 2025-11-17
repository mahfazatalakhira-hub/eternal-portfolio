import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// واجهة أصل المستخدم في قاعدة البيانات
interface UserAsset {
  id: string;
  user_id: string;
  asset_id: string;
  asset_type: string;
  category: string;
  value: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// واجهة سجل العمل
interface ActionRecord {
  id: string;
  user_id: string;
  asset_id: string;
  action_type: 'add' | 'update' | 'delete';
  value: number;
  notes?: string;
  date: string;
  created_at: string;
}

// واجهة إجمالي الأصول
interface TotalAssets {
  total_houses: number;
  total_trees: number;
  total_continuous: number;
  total_social: number;
}

// واجهة الإحصائيات التفصيلية
interface DetailedStats {
  jihad_equivalent: number; // السعي على الأرامل (أجر المجاهد)
  prophet_proximity: number; // كفالة اليتيم (مرافقة النبي)
  needs_fulfilled: number; // قضاء حوائج الناس
  continuous_charity: number; // الصدقات الجارية
  inherited_mushaf: number; // المصاحف الموروثة
}

/**
 * Hook لجلب أصول المستخدم
 */
export const useUserAssets = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-assets', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_assets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as UserAsset[];
    },
    enabled: !!user,
  });
};

/**
 * Hook لجلب إجمالي أصول المستخدم
 */
export const useTotalAssets = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['total-assets', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .rpc('get_user_total_assets', { p_user_id: user.id });

      if (error) throw error;
      
      // إرجاع القيمة الأولى من المصفوفة
      const totals = data[0] || {
        total_houses: 0,
        total_trees: 0,
        total_continuous: 0,
        total_social: 0
      };

      return totals as TotalAssets;
    },
    enabled: !!user,
  });
};

/**
 * Hook لجلب أصل معين
 */
export const useAssetByAssetId = (assetId: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-asset', user?.id, assetId],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_assets')
        .select('*')
        .eq('user_id', user.id)
        .eq('asset_id', assetId)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
      return data as UserAsset | null;
    },
    enabled: !!user && !!assetId,
  });
};

/**
 * Hook لإضافة أو تحديث أصل
 */
export const useUpsertAsset = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      assetId,
      assetType,
      category,
      value,
      notes,
    }: {
      assetId: string;
      assetType: string;
      category: string;
      value: number;
      notes?: string;
    }) => {
      if (!user) throw new Error('User not authenticated');

      // التحقق من وجود الأصل
      const { data: existingAsset } = await supabase
        .from('user_assets')
        .select('*')
        .eq('user_id', user.id)
        .eq('asset_id', assetId)
        .single();

      if (existingAsset) {
        // تحديث الأصل الموجود
        const newValue = existingAsset.value + value;
        const { data, error } = await supabase
          .from('user_assets')
          .update({ value: newValue, notes })
          .eq('id', existingAsset.id)
          .select()
          .single();

        if (error) throw error;

        // إضافة سجل العمل
        await supabase.from('action_records').insert({
          user_id: user.id,
          asset_id: assetId,
          action_type: 'update',
          value: value,
          notes,
        });

        return data;
      } else {
        // إضافة أصل جديد
        const { data, error } = await supabase
          .from('user_assets')
          .insert({
            user_id: user.id,
            asset_id: assetId,
            asset_type: assetType,
            category: category,
            value: value,
            notes,
          })
          .select()
          .single();

        if (error) throw error;

        // إضافة سجل العمل
        await supabase.from('action_records').insert({
          user_id: user.id,
          asset_id: assetId,
          action_type: 'add',
          value: value,
          notes,
        });

        return data;
      }
    },
    onSuccess: () => {
      // تحديث الكاش
      queryClient.invalidateQueries({ queryKey: ['user-assets'] });
      queryClient.invalidateQueries({ queryKey: ['total-assets'] });
      queryClient.invalidateQueries({ queryKey: ['action-records'] });
    },
  });
};

/**
 * Hook لحذف أصل
 */
export const useDeleteAsset = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (assetDatabaseId: string) => {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('user_assets')
        .delete()
        .eq('id', assetDatabaseId)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-assets'] });
      queryClient.invalidateQueries({ queryKey: ['total-assets'] });
    },
  });
};

/**
 * Hook لجلب سجل الأعمال
 */
export const useActionRecords = (days: number = 7) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['action-records', user?.id, days],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data, error } = await supabase
        .from('action_records')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', startDate.toISOString().split('T')[0])
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ActionRecord[];
    },
    enabled: !!user,
  });
};

/**
 * Hook للحصول على الإحصائيات التفصيلية المجتمعية
 */
export const useDetailedStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['detailed-stats', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_assets')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const assets = data as UserAsset[];
      
      // حساب الإحصائيات التفصيلية
      const stats: DetailedStats = {
        jihad_equivalent: assets.find(a => a.asset_id === 'saaee-armala')?.value || 0,
        prophet_proximity: assets.find(a => a.asset_id === 'kafil-yateem-asset')?.value || 0,
        needs_fulfilled: assets.find(a => a.asset_id === 'qadaa-haajat')?.value || 0,
        continuous_charity: assets.find(a => a.asset_id === 'sadaqa-jariya')?.value || 0,
        inherited_mushaf: assets.find(a => a.asset_id === 'warratha-mushaf')?.value || 0,
      };

      return stats;
    },
    enabled: !!user,
  });
};

