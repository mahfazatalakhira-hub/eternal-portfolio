export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          age: number | null
          gender: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          age?: number | null
          gender?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          age?: number | null
          gender?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_assets: {
        Row: {
          id: string
          user_id: string
          asset_id: string
          asset_type: string
          category: string
          value: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          asset_id: string
          asset_type: string
          category: string
          value?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          asset_id?: string
          asset_type?: string
          category?: string
          value?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      action_records: {
        Row: {
          id: string
          user_id: string
          asset_id: string
          action_type: string
          value: number
          notes: string | null
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          asset_id: string
          action_type: string
          value?: number
          notes?: string | null
          date?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          asset_id?: string
          action_type?: string
          value?: number
          notes?: string | null
          date?: string
          created_at?: string
        }
      }
      daily_goals: {
        Row: {
          id: string
          user_id: string
          opportunity_id: string
          target_value: number
          current_value: number
          completed: boolean
          date: string
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          opportunity_id: string
          target_value?: number
          current_value?: number
          completed?: boolean
          date?: string
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          opportunity_id?: string
          target_value?: number
          current_value?: number
          completed?: boolean
          date?: string
          created_at?: string
          completed_at?: string | null
        }
      }
      reminders: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          reminder_time: string
          days_of_week: number[] | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          reminder_time: string
          days_of_week?: number[] | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          reminder_time?: string
          days_of_week?: number[] | null
          is_active?: boolean
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          achievement_type: string
          title: string
          description: string | null
          achieved_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_type: string
          title: string
          description?: string | null
          achieved_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_type?: string
          title?: string
          description?: string | null
          achieved_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_total_assets: {
        Args: {
          p_user_id: string
        }
        Returns: {
          total_houses: number
          total_trees: number
          total_continuous: number
          total_social: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
