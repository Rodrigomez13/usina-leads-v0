export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      ads: {
        Row: {
          active: boolean | null
          adAccount: string | null
          adSet: string | null
          api: string | null
          bm: string | null
          budget: number | null
          campaign: string | null
          created_at: string | null
          id: string
          name: string | null
          portfolio: string | null
          server_id: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          adAccount?: string | null
          adSet?: string | null
          api?: string | null
          bm?: string | null
          budget?: number | null
          campaign?: string | null
          created_at?: string | null
          id: string
          name?: string | null
          portfolio?: string | null
          server_id?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          adAccount?: string | null
          adSet?: string | null
          api?: string | null
          bm?: string | null
          budget?: number | null
          campaign?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          portfolio?: string | null
          server_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ads_server_id_fkey"
            columns: ["server_id"]
            isOne: false
            isOtherKeyPresent: true
            relation: "servers"
            schema: "public"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          active: boolean | null
          address: string | null
          created_at: string | null
          daily_goal: number | null
          email: string | null
          id: string
          name: string | null
          phone: string | null
          server_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          address?: string | null
          created_at?: string | null
          daily_goal?: number | null
          email?: string | null
          id: string
          name?: string | null
          phone?: string | null
          server_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          address?: string | null
          created_at?: string | null
          daily_goal?: number | null
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          server_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_server_id_fkey"
            columns: ["server_id"]
            isOne: false
            isOtherKeyPresent: true
            relation: "servers"
            schema: "public"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          ad_id: string | null
          client_id: string | null
          created_at: string | null
          data: Json | null
          id: string
          server_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          ad_id?: string | null
          client_id?: string | null
          created_at?: string | null
          data?: Json | null
          id: string
          server_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          ad_id?: string | null
          client_id?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          server_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_ad_id_fkey"
            columns: ["ad_id"]
            isOne: false
            isOtherKeyPresent: true
            relation: "ads"
            schema: "public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_client_id_fkey"
            columns: ["client_id"]
            isOne: false
            isOtherKeyPresent: true
            relation: "clients"
            schema: "public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_server_id_fkey"
            columns: ["server_id"]
            isOne: false
            isOtherKeyPresent: true
            relation: "servers"
            schema: "public"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string | null
          created_by: string | null
          format: string | null
          id: string
          name: string | null
          parameters: Json | null
          recipients: Json | null
          schedule: string | null
          status: string | null
          type: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          format?: string | null
          id: string
          name?: string | null
          parameters?: Json | null
          recipients?: Json | null
          schedule?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          format?: string | null
          id?: string
          name?: string | null
          parameters?: Json | null
          recipients?: Json | null
          schedule?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      servers: {
        Row: {
          active: boolean | null
          coefficient: number | null
          created_at: string | null
          description: string | null
          id: string
          ip_address: string | null
          name: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          coefficient?: number | null
          created_at?: string | null
          description?: string | null
          id: string
          ip_address?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          coefficient?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          ip_address?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          active: boolean | null
          created_at: string | null
          email: string | null
          hourly_rate: number | null
          id: string
          name: string | null
          overtime_rate: number | null
          phone: string | null
          rest_day: string | null
          role: string | null
          salary: number | null
          shift: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          email?: string | null
          hourly_rate?: number | null
          id: string
          name?: string | null
          overtime_rate?: number | null
          phone?: string | null
          rest_day?: string | null
          role?: string | null
          salary?: number | null
          shift?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          email?: string | null
          hourly_rate?: number | null
          id?: string
          name?: string | null
          overtime_rate?: number | null
          phone?: string | null
          rest_day?: string | null
          role?: string | null
          salary?: number | null
          shift?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number | null
          client: string | null
          created_at: string | null
          date: string | null
          description: string | null
          id: string
          server_id: string | null
          status: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          client?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id: string
          server_id?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          client?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          server_id?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          last_login: string | null
          name: string | null
          password_hash: string | null
          role: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          last_login?: string | null
          name?: string | null
          password_hash?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          last_login?: string | null
          name?: string | null
          password_hash?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      client_performance: {
        Row: {
          client_id: string | null
          client_name: string | null
          conversions: number | null
          expense: number | null
          leads: number | null
          roi: number | null
        }
        Relationships: []
      }
      server_performance: {
        Row: {
          conversions: number | null
          expense: number | null
          leads: number | null
          roi: number | null
          server_id: string | null
          server_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      generate_report: {
        Args: {
          p_name: string
          p_type: string
          p_format: string
          p_parameters: Jsonb
          p_user_id: Uuid
        }
        Returns: Uuid
      }
      get_client_performance: {
        Args: {
          days: number
        }
        Returns: {
          client_id: string
          client_name: string
          conversions: number
          expense: number
          leads: number
          roi: number
        }[]
      }
      get_dashboard_stats: {
        Args: {
          days: number
        }
        Returns: Json
      }
      get_server_performance: {
        Args: {
          days: number
        }
        Returns: {
          server_id: string
          server_name: string
          conversions: number
          expense: number
          leads: number
          roi: number
        }[]
      }
      login: {
        Args: {
          p_email: string
          p_password: string
        }
        Returns: {
          id: Uuid
          name: string
          email: string
          role: string
          token: string
        }[]
      }
      log_audit_event: {
        Args: {
          p_user_id: Uuid
          p_user_email: Text
          p_action: Text
          p_resource_type: Text
          p_resource_id: Uuid
          p_parameters: Jsonb
          p_old_data: Jsonb
          p_new_data: Jsonb
        }
        Returns: Record<string, unknown>
      }
      schedule_report: {
        Args: {
          p_report_id: Uuid
          p_schedule: Text
          p_recipients: Jsonb
          p_user_id: Uuid
        }
        Returns: boolean
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Table<
  K extends keyof PublicSchema["Tables"],
  T extends PublicSchema["Tables"][K]["Row"],
> = PublicSchema["Tables"][K]["Row"]
export type TableInsert<
  K extends keyof PublicSchema["Tables"],
  T extends PublicSchema["Tables"][K]["Insert"],
> = PublicSchema["Tables"][K]["Insert"]
export type TableUpdate<
  K extends keyof PublicSchema["Tables"],
  T extends PublicSchema["Tables"][K]["Update"],
> = PublicSchema["Tables"][K]["Update"]

export type Uuid = string
export type Text = string
export type Jsonb = Json
