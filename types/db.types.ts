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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
