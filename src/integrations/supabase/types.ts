export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      anonymous_guides: {
        Row: {
          candidate_name: string | null
          company: string
          content: string
          created_at: string
          id: string
          job_description_text: string | null
          job_title: string
          resume_filename: string | null
          session_id: string
          title: string
        }
        Insert: {
          candidate_name?: string | null
          company: string
          content: string
          created_at?: string
          id?: string
          job_description_text?: string | null
          job_title: string
          resume_filename?: string | null
          session_id: string
          title: string
        }
        Update: {
          candidate_name?: string | null
          company?: string
          content?: string
          created_at?: string
          id?: string
          job_description_text?: string | null
          job_title?: string
          resume_filename?: string | null
          session_id?: string
          title?: string
        }
        Relationships: []
      }
      calendar_events: {
        Row: {
          completed: boolean | null
          created_at: string
          description: string | null
          end_time: string
          guide_id: string | null
          id: string
          start_time: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          description?: string | null
          end_time: string
          guide_id?: string | null
          id?: string
          start_time: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          description?: string | null
          end_time?: string
          guide_id?: string | null
          id?: string
          start_time?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "interview_guides"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_guides: {
        Row: {
          candidate_name: string | null
          company: string
          content: string
          created_at: string
          feedback: Json | null
          follow_up_sent: boolean | null
          hiring_decision: string | null
          id: string
          interview_date: string | null
          job_description_text: string | null
          job_title: string
          reminder_sent: boolean | null
          resume_filename: string | null
          status: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          candidate_name?: string | null
          company: string
          content: string
          created_at?: string
          feedback?: Json | null
          follow_up_sent?: boolean | null
          hiring_decision?: string | null
          id?: string
          interview_date?: string | null
          job_description_text?: string | null
          job_title: string
          reminder_sent?: boolean | null
          resume_filename?: string | null
          status?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          candidate_name?: string | null
          company?: string
          content?: string
          created_at?: string
          feedback?: Json | null
          follow_up_sent?: boolean | null
          hiring_decision?: string | null
          id?: string
          interview_date?: string | null
          job_description_text?: string | null
          job_title?: string
          reminder_sent?: boolean | null
          resume_filename?: string | null
          status?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          guides_created: number
          id: string
          name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          guides_created?: number
          id: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          guides_created?: number
          id?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      wp_blog_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
          wp_id: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
          wp_id: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
          wp_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "wp_blog_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "wp_blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      wp_blog_posts: {
        Row: {
          author: string
          categories: string[] | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          published_at: string
          read_time: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          wp_id: number
        }
        Insert: {
          author: string
          categories?: string[] | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published_at: string
          read_time?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at: string
          wp_id: number
        }
        Update: {
          author?: string
          categories?: string[] | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published_at?: string
          read_time?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          wp_id?: number
        }
        Relationships: []
      }
      wp_blog_settings: {
        Row: {
          api_key: string | null
          auto_sync: boolean | null
          created_at: string
          id: string
          last_synced: string | null
          sync_frequency: string | null
          updated_at: string
          wordpress_url: string
        }
        Insert: {
          api_key?: string | null
          auto_sync?: boolean | null
          created_at?: string
          id?: string
          last_synced?: string | null
          sync_frequency?: string | null
          updated_at?: string
          wordpress_url: string
        }
        Update: {
          api_key?: string | null
          auto_sync?: boolean | null
          created_at?: string
          id?: string
          last_synced?: string | null
          sync_frequency?: string | null
          updated_at?: string
          wordpress_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never> | { user_id: string }
        Returns: boolean
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "user"],
    },
  },
} as const
