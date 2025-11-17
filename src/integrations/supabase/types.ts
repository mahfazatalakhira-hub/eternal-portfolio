export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          achieved_at: string | null
          achievement_type: string
          description: string | null
          id: string
          title: string
          user_id: string
        }
        Insert: {
          achieved_at?: string | null
          achievement_type: string
          description?: string | null
          id?: string
          title: string
          user_id: string
        }
        Update: {
          achieved_at?: string | null
          achievement_type?: string
          description?: string | null
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      action_records: {
        Row: {
          action_type: string
          asset_id: string
          created_at: string | null
          date: string | null
          id: string
          notes: string | null
          user_id: string
          value: number | null
        }
        Insert: {
          action_type: string
          asset_id: string
          created_at?: string | null
          date?: string | null
          id?: string
          notes?: string | null
          user_id: string
          value?: number | null
        }
        Update: {
          action_type?: string
          asset_id?: string
          created_at?: string | null
          date?: string | null
          id?: string
          notes?: string | null
          user_id?: string
          value?: number | null
        }
        Relationships: []
      }
      daily_goals: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          current_value: number | null
          date: string | null
          id: string
          opportunity_id: string
          target_value: number | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          current_value?: number | null
          date?: string | null
          id?: string
          opportunity_id: string
          target_value?: number | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          current_value?: number | null
          date?: string | null
          id?: string
          opportunity_id?: string
          target_value?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number
          created_at: string
          full_name: string
          gender: string
          id: string
          updated_at: string
        }
        Insert: {
          age: number
          created_at?: string
          full_name: string
          gender: string
          id: string
          updated_at?: string
        }
        Update: {
          age?: number
          created_at?: string
          full_name?: string
          gender?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      reminders: {
        Row: {
          created_at: string | null
          days_of_week: number[] | null
          description: string | null
          id: string
          is_active: boolean | null
          reminder_time: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          days_of_week?: number[] | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          reminder_time: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          days_of_week?: number[] | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          reminder_time?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      user_assets: {
        Row: {
          asset_id: string
          asset_type: string
          category: string
          created_at: string | null
          id: string
          notes: string | null
          updated_at: string | null
          user_id: string
          value: number | null
        }
        Insert: {
          asset_id: string
          asset_type: string
          category: string
          created_at?: string | null
          id?: string
          notes?: string | null
          updated_at?: string | null
          user_id: string
          value?: number | null
        }
        Update: {
          asset_id?: string
          asset_type?: string
          category?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          updated_at?: string | null
          user_id?: string
          value?: number | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          age: number | null
          created_at: string | null
          full_name: string | null
          gender: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string | null
          full_name?: string | null
          gender?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_total_assets: {
        Args: { p_user_id: string }
        Returns: {
          total_continuous: number
          total_houses: number
          total_social: number
          total_trees: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
