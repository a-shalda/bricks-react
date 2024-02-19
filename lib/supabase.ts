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
      clients: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
        }
        Relationships: []
      }
      orders: {
        Row: {
          client_id: string | null
          created_at: string
          id: string
          order_details: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          id?: string
          order_details: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          id?: string
          order_details?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          availability: string
          availability_en: string
          description: string | null
          description_en: string | null
          filepath: string
          id: string
          image_original__001: string
          image_original__002: string | null
          image_original__003: string | null
          image_original__004: string | null
          image_original__005: string | null
          image_original__006: string | null
          image_original__007: string | null
          image_original__008: string | null
          image_original__009: string | null
          image_original__010: string | null
          image_original__011: string | null
          image_original__012: string | null
          image_original__013: string | null
          image_original__014: string | null
          image_original__015: string | null
          image_original__016: string | null
          image_original__017: string | null
          image_original__018: string | null
          image_original__019: string | null
          image_original__020: string | null
          image_thumbnail__001: string
          image_thumbnail__002: string
          isLinearMeter: boolean
          isM2: boolean
          name: string
          priceCentsM2: number | null
          priceCentsPc: number | null
          priceType: number | null
          productTypeNumber: number
          specs__color: string | null
          specs__countryOfOrigin: string
          specs__countryOfOrigin_en: string
          specs__format: string | null
          specs__manufacturer: string
          specs__piecesInLinearMeterCm: number | null
          specs__piecesInPack: number | null
          specs__piecesInPallet: number | null
          specs__piecesInSquareMeterCm: number | null
          specs__recommendedDryMortarVolume: string | null
          specs__recommendedJointSpacing: string | null
          specs__squareMetersInPallet: number | null
          specs__thickness: number | null
          specs__weightOf1PackGramm: number | null
          specs__weightOf1PieceGramm: number | null
          specs__weightOf1SquareMeter: number | null
          supplierPriceType: string
          type: string
          type_ru: string
        }
        Insert: {
          availability: string
          availability_en: string
          description?: string | null
          description_en?: string | null
          filepath: string
          id: string
          image_original__001: string
          image_original__002?: string | null
          image_original__003?: string | null
          image_original__004?: string | null
          image_original__005?: string | null
          image_original__006?: string | null
          image_original__007?: string | null
          image_original__008?: string | null
          image_original__009?: string | null
          image_original__010?: string | null
          image_original__011?: string | null
          image_original__012?: string | null
          image_original__013?: string | null
          image_original__014?: string | null
          image_original__015?: string | null
          image_original__016?: string | null
          image_original__017?: string | null
          image_original__018?: string | null
          image_original__019?: string | null
          image_original__020?: string | null
          image_thumbnail__001: string
          image_thumbnail__002: string
          isLinearMeter: boolean
          isM2: boolean
          name: string
          priceCentsM2?: number | null
          priceCentsPc?: number | null
          priceType?: number | null
          productTypeNumber: number
          specs__color?: string | null
          specs__countryOfOrigin: string
          specs__countryOfOrigin_en: string
          specs__format?: string | null
          specs__manufacturer: string
          specs__piecesInLinearMeterCm?: number | null
          specs__piecesInPack?: number | null
          specs__piecesInPallet?: number | null
          specs__piecesInSquareMeterCm?: number | null
          specs__recommendedDryMortarVolume?: string | null
          specs__recommendedJointSpacing?: string | null
          specs__squareMetersInPallet?: number | null
          specs__thickness?: number | null
          specs__weightOf1PackGramm?: number | null
          specs__weightOf1PieceGramm?: number | null
          specs__weightOf1SquareMeter?: number | null
          supplierPriceType: string
          type: string
          type_ru: string
        }
        Update: {
          availability?: string
          availability_en?: string
          description?: string | null
          description_en?: string | null
          filepath?: string
          id?: string
          image_original__001?: string
          image_original__002?: string | null
          image_original__003?: string | null
          image_original__004?: string | null
          image_original__005?: string | null
          image_original__006?: string | null
          image_original__007?: string | null
          image_original__008?: string | null
          image_original__009?: string | null
          image_original__010?: string | null
          image_original__011?: string | null
          image_original__012?: string | null
          image_original__013?: string | null
          image_original__014?: string | null
          image_original__015?: string | null
          image_original__016?: string | null
          image_original__017?: string | null
          image_original__018?: string | null
          image_original__019?: string | null
          image_original__020?: string | null
          image_thumbnail__001?: string
          image_thumbnail__002?: string
          isLinearMeter?: boolean
          isM2?: boolean
          name?: string
          priceCentsM2?: number | null
          priceCentsPc?: number | null
          priceType?: number | null
          productTypeNumber?: number
          specs__color?: string | null
          specs__countryOfOrigin?: string
          specs__countryOfOrigin_en?: string
          specs__format?: string | null
          specs__manufacturer?: string
          specs__piecesInLinearMeterCm?: number | null
          specs__piecesInPack?: number | null
          specs__piecesInPallet?: number | null
          specs__piecesInSquareMeterCm?: number | null
          specs__recommendedDryMortarVolume?: string | null
          specs__recommendedJointSpacing?: string | null
          specs__squareMetersInPallet?: number | null
          specs__thickness?: number | null
          specs__weightOf1PackGramm?: number | null
          specs__weightOf1PieceGramm?: number | null
          specs__weightOf1SquareMeter?: number | null
          supplierPriceType?: string
          type?: string
          type_ru?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
