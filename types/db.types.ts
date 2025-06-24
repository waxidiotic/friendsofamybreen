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
      guestbook_entries: {
        Row: {
          created_at: string
          id: number
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          message: string
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
          name?: string
        }
        Relationships: []
      }
      images: {
        Row: {
          api_key: string | null
          asset_folder: string | null
          asset_id: string | null
          bytes: number | null
          created_at: string
          display_name: string | null
          etag: string | null
          format: string | null
          height: number | null
          id: number
          original_filename: string | null
          pages: number | null
          placeholder: boolean | null
          public_id: string | null
          resource_type: string | null
          secure_url: string | null
          signature: string | null
          tags: string | null
          type: string | null
          uploaded_by: string | null
          uploaded_to_cloudinary_at: string | null
          url: string | null
          version: number | null
          version_id: string | null
          visibility: boolean
          width: number | null
        }
        Insert: {
          api_key?: string | null
          asset_folder?: string | null
          asset_id?: string | null
          bytes?: number | null
          created_at?: string
          display_name?: string | null
          etag?: string | null
          format?: string | null
          height?: number | null
          id?: number
          original_filename?: string | null
          pages?: number | null
          placeholder?: boolean | null
          public_id?: string | null
          resource_type?: string | null
          secure_url?: string | null
          signature?: string | null
          tags?: string | null
          type?: string | null
          uploaded_by?: string | null
          uploaded_to_cloudinary_at?: string | null
          url?: string | null
          version?: number | null
          version_id?: string | null
          visibility?: boolean
          width?: number | null
        }
        Update: {
          api_key?: string | null
          asset_folder?: string | null
          asset_id?: string | null
          bytes?: number | null
          created_at?: string
          display_name?: string | null
          etag?: string | null
          format?: string | null
          height?: number | null
          id?: number
          original_filename?: string | null
          pages?: number | null
          placeholder?: boolean | null
          public_id?: string | null
          resource_type?: string | null
          secure_url?: string | null
          signature?: string | null
          tags?: string | null
          type?: string | null
          uploaded_by?: string | null
          uploaded_to_cloudinary_at?: string | null
          url?: string | null
          version?: number | null
          version_id?: string | null
          visibility?: boolean
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "images_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author: string
          body: string | null
          body_json: Json | null
          created_at: string
          id: number
          title: string
        }
        Insert: {
          author: string
          body?: string | null
          body_json?: Json | null
          created_at?: string
          id?: number
          title: string
        }
        Update: {
          author?: string
          body?: string | null
          body_json?: Json | null
          created_at?: string
          id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          first_name: string | null
          id: string
          last_name: string | null
          role: Database["public"]["Enums"]["role"]
        }
        Insert: {
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["role"]
        }
        Update: {
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["role"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      role: "admin" | "user"
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
      role: ["admin", "user"],
    },
  },
} as const
