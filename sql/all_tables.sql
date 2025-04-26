-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Esquema para la aplicación
CREATE SCHEMA IF NOT EXISTS usina_leads;

-- Configurar el esquema de búsqueda
SET search_path TO usina_leads, public;

-- ==========================================
-- TABLA DE USUARIOS
-- ==========================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'manager', 'operator')),
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    phone VARCHAR(50),
    bio TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login TIMESTAMPTZ
);

COMMENT ON TABLE users IS 'Usuarios del sistema con sus roles y permisos';

-- ==========================================
-- TABLA DE SERVIDORES
-- ==========================================
CREATE TABLE servers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    coefficient NUMERIC(5, 2) NOT NULL DEFAULT 10.00,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

COMMENT ON TABLE servers IS 'Servidores que gestionan los anuncios y leads';

-- ==========================================
-- TABLA DE CLIENTES/AGENCIAS
-- ==========================================
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phones INTEGER NOT NULL DEFAULT 0,
    balance NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'warning', 'inactive')),
    daily_goal INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

COMMENT ON TABLE clients IS 'Clientes o agencias que utilizan el servicio';

-- ==========================================
-- TABLA DE TELÉFONOS DE CLIENTES
-- ==========================================
CREATE TABLE client_phones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    number VARCHAR(50) NOT NULL,
    daily_goal INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_client_phones_client_id ON client_phones(client_id);

COMMENT ON TABLE client_phones IS 'Teléfonos asociados a cada cliente';

-- ==========================================
-- TABLA DE CAMPAÑAS PUBLICITARIAS
-- ==========================================
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL CHECK (platform IN ('Facebook', 'Instagram', 'Google', 'TikTok', 'Other')),
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'scheduled', 'completed')),
    budget NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    spent NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

COMMENT ON TABLE campaigns IS 'Campañas publicitarias';

-- ==========================================
-- TABLA DE ANUNCIOS
-- ==========================================
CREATE TABLE ads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    server_id UUID REFERENCES servers(id) ON DELETE SET NULL,
    platform VARCHAR(50) NOT NULL CHECK (platform IN ('Facebook', 'Instagram', 'Google', 'TikTok', 'Other')),
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'scheduled', 'completed')),
    budget NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    spent NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    api VARCHAR(255),
    portfolio VARCHAR(255),
    ad_account VARCHAR(255),
    bm VARCHAR(255),
    ad_set VARCHAR(255),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

CREATE INDEX idx_ads_campaign_id ON ads(campaign_id);
CREATE INDEX idx_ads_server_id ON ads(server_id);

COMMENT ON TABLE ads IS 'Anuncios individuales dentro de las campañas';

-- ==========================================
-- TABLA DE LEADS
-- ==========================================
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ad_id UUID REFERENCES ads(id) ON DELETE SET NULL,
    server_id UUID REFERENCES servers(id) ON DELETE SET NULL,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    phone_id UUID REFERENCES client_phones(id) ON DELETE SET NULL,
    phone_number VARCHAR(50),
    name VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'failed')),
    conversion_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_ad_id ON leads(ad_id);
CREATE INDEX idx_leads_server_id ON leads(server_id);
CREATE INDEX idx_leads_client_id ON leads(client_id);
CREATE INDEX idx_leads_phone_id ON leads(phone_id);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_status ON leads(status);

COMMENT ON TABLE leads IS 'Leads generados por los anuncios';

-- ==========================================
-- TABLA DE TRANSACCIONES FINANCIERAS
-- ==========================================
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('income', 'expense')),
    amount NUMERIC(12, 2) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'cancelled')),
    transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

CREATE INDEX idx_transactions_client_id ON transactions(client_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_transaction_date ON transactions(transaction_date);

COMMENT ON TABLE transactions IS 'Transacciones financieras de ingresos y gastos';

-- ==========================================
-- TABLA DE FACTURAS
-- ==========================================
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    amount NUMERIC(12, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'paid', 'cancelled')),
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

CREATE INDEX idx_invoices_client_id ON invoices(client_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_issue_date ON invoices(issue_date);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);

COMMENT ON TABLE invoices IS 'Facturas emitidas a los clientes';

-- ==========================================
-- TABLA DE GASTOS
-- ==========================================
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL CHECK (category IN ('Publicidad', 'Salarios', 'Servicios', 'Equipamiento', 'Alquiler', 'Otros')),
    amount NUMERIC(12, 2) NOT NULL,
    description TEXT,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('Tarjeta Corporativa', 'Transferencia Bancaria', 'Débito Automático', 'Efectivo')),
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

CREATE INDEX idx_expenses_category ON expenses(category);
CREATE INDEX idx_expenses_expense_date ON expenses(expense_date);

COMMENT ON TABLE expenses IS 'Gastos operativos del negocio';

-- ==========================================
-- TABLA DE PERSONAL
-- ==========================================
CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('Encargado de Turno', 'Operario', 'Administrativo', 'Gerente')),
    shift VARCHAR(50) NOT NULL CHECK (shift IN ('Mañana', 'Tarde', 'Noche', 'Pico Mañana', 'Pico Tarde')),
    rest_day VARCHAR(50) NOT NULL CHECK (rest_day IN ('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo')),
    salary NUMERIC(12, 2) NOT NULL,
    hourly_rate NUMERIC(12, 2) NOT NULL,
    overtime_rate NUMERIC(12, 2) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    bank_info JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

CREATE INDEX idx_staff_role ON staff(role);
CREATE INDEX idx_staff_shift ON staff(shift);
CREATE INDEX idx_staff_active ON staff(active);

COMMENT ON TABLE staff IS 'Personal que trabaja en la empresa';

-- ==========================================
-- TABLA DE ASISTENCIA
-- ==========================================
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    hours_worked NUMERIC(5, 2) NOT NULL DEFAULT 0,
    overtime NUMERIC(5, 2) NOT NULL DEFAULT 0,
    rest_day_worked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    UNIQUE(staff_id, date)
);

CREATE INDEX idx_attendance_staff_id ON attendance(staff_id);
CREATE INDEX idx_attendance_date ON attendance(date);

COMMENT ON TABLE attendance IS 'Registro de asistencia del personal';

-- ==========================================
-- TABLA DE PAGOS AL PERSONAL
-- ==========================================
CREATE TABLE staff_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('salary', 'advance', 'bonus')),
    description TEXT,
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

CREATE INDEX idx_staff_payments_staff_id ON staff_payments(staff_id);
CREATE INDEX idx_staff_payments_payment_date ON staff_payments(payment_date);
CREATE INDEX idx_staff_payments_type ON staff_payments(type);

COMMENT ON TABLE staff_payments IS 'Pagos realizados al personal';

-- ==========================================
-- TABLA DE REPORTES
-- ==========================================
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('general', 'server', 'client', 'advertising', 'finance', 'conversion')),
    format VARCHAR(50) NOT NULL CHECK (format IN ('pdf', 'excel', 'csv')),
    parameters JSONB,
    schedule VARCHAR(50) CHECK (schedule IN ('none', 'daily', 'weekly', 'monthly')),
    last_run TIMESTAMPTZ,
    next_run TIMESTAMPTZ,
    recipients JSONB,
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

CREATE INDEX idx_reports_type ON reports(type);
CREATE INDEX idx_reports_schedule ON reports(schedule);
CREATE INDEX idx_reports_next_run ON reports(next_run);

COMMENT ON TABLE reports IS 'Reportes generados o programados';

-- ==========================================
-- TABLA DE INTEGRACIONES
-- ==========================================
CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Facebook Ads', 'Instagram Ads', 'WhatsApp API', 'Email Marketing', 'Payment Gateway')),
    status VARCHAR(50) NOT NULL DEFAULT 'disconnected' CHECK (status IN ('connected', 'disconnected')),
    credentials JSONB,
    last_sync TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

CREATE INDEX idx_integrations_type ON integrations(type);
CREATE INDEX idx_integrations_status ON integrations(status);

COMMENT ON TABLE integrations IS 'Integraciones con servicios externos';

-- ==========================================
-- TABLA DE CONFIGURACIÓN DEL SISTEMA
-- ==========================================
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL DEFAULT 'Usina Leads',
    timezone VARCHAR(50) NOT NULL DEFAULT 'America/Argentina/Buenos_Aires',
    language VARCHAR(10) NOT NULL DEFAULT 'es',
    date_format VARCHAR(20) NOT NULL DEFAULT 'dd/MM/yyyy',
    dark_theme BOOLEAN NOT NULL DEFAULT TRUE,
    backup_settings JSONB NOT NULL DEFAULT '{"automatic": true, "frequency": "daily", "retention": "30"}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES users(id)
);

COMMENT ON TABLE system_settings IS 'Configuración general del sistema';

-- ==========================================
-- TABLA DE NOTIFICACIONES
-- ==========================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('info', 'warning', 'error', 'success')),
    read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

COMMENT ON TABLE notifications IS 'Notificaciones para los usuarios';

-- ==========================================
-- TABLA DE REGISTRO DE ACTIVIDAD (AUDIT LOG)
-- ==========================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    user_email VARCHAR(255),
    action VARCHAR(50) NOT NULL CHECK (action IN ('login', 'logout', 'create', 'update', 'delete', 'view')),
    resource VARCHAR(50) NOT NULL,
    resource_id UUID,
    details JSONB,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

COMMENT ON TABLE audit_logs IS 'Registro de actividades de los usuarios';

-- ==========================================
-- FUNCIONES Y TRIGGERS
-- ==========================================

-- Función para actualizar el campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar el trigger a todas las tablas con updated_at
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN 
        SELECT table_name 
        FROM information_schema.columns 
        WHERE column_name = 'updated_at' 
        AND table_schema = 'usina_leads'
    LOOP
        EXECUTE format('CREATE TRIGGER set_updated_at
                        BEFORE UPDATE ON usina_leads.%I
                        FOR EACH ROW
                        EXECUTE FUNCTION update_updated_at_column()', t);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Función para registrar actividad de auditoría
CREATE OR REPLACE FUNCTION log_audit_event(
    p_user_id UUID,
    p_user_email VARCHAR(255),
    p_action VARCHAR(50),
    p_resource VARCHAR(50),
    p_resource_id UUID,
    p_details JSONB,
    p_ip_address VARCHAR(50),
    p_user_agent TEXT
)
RETURNS UUID AS $$
DECLARE
    v_id UUID;
BEGIN
    INSERT INTO audit_logs (
        user_id, user_email, action, resource, resource_id, 
        details, ip_address, user_agent
    ) VALUES (
        p_user_id, p_user_email, p_action, p_resource, p_resource_id, 
        p_details, p_ip_address, p_user_agent
    ) RETURNING id INTO v_id;
    
    RETURN v_id;
END;
$$ LANGUAGE plpgsql;

-- Función para actualizar el saldo del cliente
CREATE OR REPLACE FUNCTION update_client_balance()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.type = 'income' THEN
        UPDATE clients 
        SET balance = balance + NEW.amount
        WHERE id = NEW.client_id;
    ELSIF NEW.type = 'expense' THEN
        UPDATE clients 
        SET balance = balance - NEW.amount
        WHERE id = NEW.client_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar el saldo del cliente
CREATE TRIGGER update_client_balance_trigger
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_client_balance();

-- Función para actualizar el estado de la factura cuando se paga
CREATE OR REPLACE FUNCTION update_invoice_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.type = 'income' AND NEW.status = 'completed' THEN
        UPDATE invoices 
        SET status = 'paid', updated_at = NOW()
        WHERE client_id = NEW.client_id 
        AND status = 'pending' 
        AND id = (
            SELECT id FROM invoices 
            WHERE client_id = NEW.client_id 
            AND status = 'pending' 
            ORDER BY due_date ASC 
            LIMIT 1
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar el estado de la factura
CREATE TRIGGER update_invoice_status_trigger
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_invoice_status();

-- ==========================================
-- VISTAS
-- ==========================================

-- Vista para el dashboard principal
CREATE OR REPLACE VIEW dashboard_overview AS
SELECT
    (SELECT COUNT(*) FROM leads WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') AS leads_last_30_days,
    (SELECT COUNT(*) FROM leads WHERE status = 'converted' AND created_at >= CURRENT_DATE - INTERVAL '30 days') AS conversions_last_30_days,
    (SELECT SUM(amount) FROM transactions WHERE type = 'income' AND transaction_date >= CURRENT_DATE - INTERVAL '30 days') AS income_last_30_days,
    (SELECT SUM(amount) FROM transactions WHERE type = 'expense' AND transaction_date >= CURRENT_DATE - INTERVAL '30 days') AS expenses_last_30_days,
    (SELECT COUNT(*) FROM clients WHERE status = 'active') AS active_clients,
    (SELECT COUNT(*) FROM servers WHERE active = TRUE) AS active_servers,
    (SELECT COUNT(*) FROM ads WHERE active = TRUE) AS active_ads;

-- Vista para el rendimiento de servidores
CREATE OR REPLACE VIEW server_performance AS
SELECT
    s.id AS server_id,
    s.name AS server_name,
    COUNT(l.id) AS total_leads,
    SUM(CASE WHEN l.status = 'converted' THEN 1 ELSE 0 END) AS total_conversions,
    CASE 
        WHEN COUNT(l.id) > 0 THEN 
            ROUND((SUM(CASE WHEN l.status = 'converted' THEN 1 ELSE 0 END)::NUMERIC / COUNT(l.id)) * 100, 2)
        ELSE 0
    END AS conversion_rate,
    s.coefficient
FROM
    servers s
LEFT JOIN
    leads l ON s.id = l.server_id AND l.created_at >= CURRENT_DATE - INTERVAL '30 days'
WHERE
    s.active = TRUE
GROUP BY
    s.id, s.name, s.coefficient
ORDER BY
    total_leads DESC;

-- Vista para el rendimiento de clientes
CREATE OR REPLACE VIEW client_performance AS
SELECT
    c.id AS client_id,
    c.name AS client_name,
    COUNT(l.id) AS total_leads,
    SUM(CASE WHEN l.status = 'converted' THEN 1 ELSE 0 END) AS total_conversions,
    CASE 
        WHEN COUNT(l.id) > 0 THEN 
            ROUND((SUM(CASE WHEN l.status = 'converted' THEN 1 ELSE 0 END)::NUMERIC / COUNT(l.id)) * 100, 2)
        ELSE 0
    END AS conversion_rate,
    c.balance,
    c.daily_goal,
    c.phones AS total_phones
FROM
    clients c
LEFT JOIN
    leads l ON c.id = l.client_id AND l.created_at >= CURRENT_DATE - INTERVAL '30 days'
WHERE
    c.status = 'active'
GROUP BY
    c.id, c.name, c.balance, c.daily_goal, c.phones
ORDER BY
    total_leads DESC;

-- Vista para el rendimiento de anuncios
CREATE OR REPLACE VIEW ad_performance AS
SELECT
    a.id AS ad_id,
    a.name AS ad_name,
    a.campaign_id,
    c.name AS campaign_name,
    a.server_id,
    s.name AS server_name,
    COUNT(l.id) AS total_leads,
    SUM(CASE WHEN l.status = 'converted' THEN 1 ELSE 0 END) AS total_conversions,
    CASE 
        WHEN COUNT(l.id) > 0 THEN 
            ROUND((SUM(CASE WHEN l.status = 'converted' THEN 1 ELSE 0 END)::NUMERIC / COUNT(l.id)) * 100, 2)
        ELSE 0
    END AS conversion_rate,
    a.budget,
    a.spent,
    a.platform,
    a.active
FROM
    ads a
LEFT JOIN
    campaigns c ON a.campaign_id = c.id
LEFT JOIN
    servers s ON a.server_id = s.id
LEFT JOIN
    leads l ON a.id = l.ad_id AND l.created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY
    a.id, a.name, a.campaign_id, c.name, a.server_id, s.name, a.budget, a.spent, a.platform, a.active
ORDER BY
    total_leads DESC;

-- Vista para el resumen financiero
CREATE OR REPLACE VIEW financial_summary AS
SELECT
    DATE_TRUNC('month', transaction_date)::DATE AS month,
    SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
    SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expenses,
    SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) AS net_amount
FROM
    transactions
WHERE
    transaction_date >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY
    DATE_TRUNC('month', transaction_date)
ORDER BY
    month DESC;

-- ==========================================
-- DATOS INICIALES
-- ==========================================

-- Insertar usuario administrador inicial
INSERT INTO users (
    name, email, password_hash, role, status, created_at, updated_at
) VALUES (
    'Admin Usuario', 
    'admin@usina.com', 
    crypt('admin123', gen_salt('bf')), 
    'admin', 
    'active', 
    NOW(), 
    NOW()
);

-- Insertar configuración inicial del sistema
INSERT INTO system_settings (
    company_name, timezone, language, date_format, dark_theme, backup_settings, created_at, updated_at
) VALUES (
    'Usina Leads', 
    'America/Argentina/Buenos_Aires', 
    'es', 
    'dd/MM/yyyy', 
    TRUE, 
    '{"automatic": true, "frequency": "daily", "retention": "30"}', 
    NOW(), 
    NOW()
);

-- ==========================================
-- POLÍTICAS DE SEGURIDAD PARA SUPABASE
-- ==========================================

-- Habilitar RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_phones ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Política para usuarios administradores (acceso completo)
CREATE POLICY admin_all_access ON users 
    FOR ALL 
    TO authenticated 
    USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'))
    WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Política para que los usuarios puedan ver su propia información
CREATE POLICY users_read_own ON users 
    FOR SELECT 
    TO authenticated 
    USING (id = auth.uid());

-- Política para que los usuarios puedan actualizar su propia información
CREATE POLICY users_update_own ON users 
    FOR UPDATE 
    TO authenticated 
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid() AND role = OLD.role);

-- Política para notificaciones (ver propias)
CREATE POLICY notifications_select_own ON notifications 
    FOR SELECT 
    TO authenticated 
    USING (user_id = auth.uid());

-- Política para marcar notificaciones como leídas
CREATE POLICY notifications_update_own ON notifications 
    FOR UPDATE 
    TO authenticated 
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Política para ver registros de auditoría (solo admin)
CREATE POLICY audit_logs_select_admin ON audit_logs 
    FOR SELECT
    TO authenticated 
    USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Políticas para servidores
CREATE POLICY servers_select_all ON servers 
    FOR SELECT 
    TO authenticated 
    USING (true);

CREATE POLICY servers_insert_admin_manager ON servers 
    FOR INSERT 
    TO authenticated 
    WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'manager')));

CREATE POLICY servers_update_admin_manager ON servers 
    FOR UPDATE 
    TO  'manager')));

CREATE POLICY servers_update_admin_manager ON servers 
    FOR UPDATE 
    TO authenticated 
    USING (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'manager')))
    WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'manager')));

CREATE POLICY servers_delete_admin ON servers 
    FOR DELETE 
    TO authenticated 
    USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Políticas para clientes
CREATE POLICY clients_select_all ON clients 
    FOR SELECT 
    TO authenticated 
    USING (true);

CREATE POLICY clients_insert_admin_manager ON clients 
    FOR INSERT 
    TO authenticated 
    WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'manager')));

CREATE POLICY clients_update_admin_manager ON clients 
    FOR UPDATE 
    TO authenticated 
    USING (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'manager')))
    WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'manager')));

CREATE POLICY clients_delete_admin ON clients 
    FOR DELETE 
    TO authenticated 
    USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Políticas para anuncios
CREATE POLICY ads_select_all ON ads 
    FOR SELECT 
    TO authenticated 
    USING (true);

CREATE POLICY ads_insert_admin_manager ON ads 
    FOR INSERT 
    TO authenticated 
    WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'manager')));

CREATE POLICY ads_update_admin_manager ON ads 
    FOR UPDATE 
    TO authenticated 
    USING (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'manager')))
    WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'manager')));

CREATE POLICY ads_delete_admin ON ads 
    FOR DELETE 
    TO authenticated 
    USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Políticas para leads
CREATE POLICY leads_select_all ON leads 
    FOR SELECT 
    TO authenticated 
    USING (true);

CREATE POLICY leads_insert_all ON leads 
    FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

CREATE POLICY leads_update_all ON leads 
    FOR UPDATE 
    TO authenticated 
    USING (true)
    WITH CHECK (true);

CREATE POLICY leads_delete_admin ON leads 
    FOR DELETE 
    TO authenticated 
    USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Políticas para transacciones
CREATE POLICY transactions_select_all ON transactions 
    FOR SELECT 
    TO authenticated 
    USING (true);

CREATE POLICY transactions_insert_admin_manager ON transactions 
    FOR INSERT 
    TO authenticated 
    WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'manager')));

CREATE POLICY transactions_update_admin_manager ON transactions 
    FOR UPDATE 
    TO authenticated 
    USING (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'manager')))
    WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'manager')));

CREATE POLICY transactions_delete_admin ON transactions 
    FOR DELETE 
    TO authenticated 
    USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- ==========================================
-- FUNCIONES RPC PARA SUPABASE
-- ==========================================

-- Función para autenticar usuario
CREATE OR REPLACE FUNCTION login(email TEXT, password TEXT)
RETURNS TABLE (
    id UUID,
    name TEXT,
    email TEXT,
    role TEXT,
    token TEXT
) AS $$
DECLARE
    v_user users;
    v_token TEXT;
BEGIN
    SELECT * INTO v_user
    FROM users
    WHERE users.email = login.email
    AND users.password_hash = crypt(login.password, users.password_hash)
    AND users.status = 'active';
    
    IF v_user.id IS NULL THEN
        RAISE EXCEPTION 'Invalid email or password';
    END IF;
    
    -- Actualizar último login
    UPDATE users SET last_login = NOW() WHERE id = v_user.id;
    
    -- Registrar en audit log
    PERFORM log_audit_event(
        v_user.id,
        v_user.email,
        'login',
        'sistema',
        NULL,
        NULL,
        NULL,
        NULL
    );
    
    -- Generar token (simulado - en Supabase esto lo maneja el sistema de autenticación)
    v_token := encode(gen_random_bytes(32), 'hex');
    
    RETURN QUERY SELECT 
        v_user.id,
        v_user.name,
        v_user.email,
        v_user.role,
        v_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener estadísticas del dashboard
CREATE OR REPLACE FUNCTION get_dashboard_stats(days INTEGER DEFAULT 30)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'leads', (SELECT COUNT(*) FROM leads WHERE created_at >= CURRENT_DATE - (days || ' days')::INTERVAL),
        'conversions', (SELECT COUNT(*) FROM leads WHERE status = 'converted' AND created_at >= CURRENT_DATE - (days || ' days')::INTERVAL),
        'income', (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE type = 'income' AND transaction_date >= CURRENT_DATE - (days || ' days')::INTERVAL),
        'expenses', (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE type = 'expense' AND transaction_date >= CURRENT_DATE - (days || ' days')::INTERVAL),
        'active_clients', (SELECT COUNT(*) FROM clients WHERE status = 'active'),
        'active_servers', (SELECT COUNT(*) FROM servers WHERE active = TRUE),
        'active_ads', (SELECT COUNT(*) FROM ads WHERE active = TRUE)
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener el rendimiento de servidores
CREATE OR REPLACE FUNCTION get_server_performance(days INTEGER DEFAULT 30)
RETURNS SETOF server_performance AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM server_performance;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener el rendimiento de clientes
CREATE OR REPLACE FUNCTION get_client_performance(days INTEGER DEFAULT 30)
RETURNS SETOF client_performance AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM client_performance;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para generar un reporte
CREATE OR REPLACE FUNCTION generate_report(
    p_name TEXT,
    p_type TEXT,
    p_format TEXT,
    p_parameters JSONB,
    p_user_id UUID
)
RETURNS UUID AS $$
DECLARE
    v_report_id UUID;
BEGIN
    INSERT INTO reports (
        name, type, format, parameters, status, created_by
    ) VALUES (
        p_name, p_type, p_format, p_parameters, 'active', p_user_id
    ) RETURNING id INTO v_report_id;
    
    -- Registrar en audit log
    PERFORM log_audit_event(
        p_user_id,
        (SELECT email FROM users WHERE id = p_user_id),
        'create',
        'reporte',
        v_report_id,
        p_parameters,
        NULL,
        NULL
    );
    
    RETURN v_report_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para programar un reporte
CREATE OR REPLACE FUNCTION schedule_report(
    p_report_id UUID,
    p_schedule TEXT,
    p_recipients JSONB,
    p_user_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
    v_next_run TIMESTAMPTZ;
BEGIN
    -- Calcular próxima ejecución
    IF p_schedule = 'daily' THEN
        v_next_run := CURRENT_DATE + INTERVAL '1 day';
    ELSIF p_schedule = 'weekly' THEN
        v_next_run := CURRENT_DATE + INTERVAL '1 week';
    ELSIF p_schedule = 'monthly' THEN
        v_next_run := CURRENT_DATE + INTERVAL '1 month';
    ELSE
        v_next_run := NULL;
    END IF;
    
    UPDATE reports
    SET 
        schedule = p_schedule,
        next_run = v_next_run,
        recipients = p_recipients,
        updated_at = NOW(),
        updated_by = p_user_id
    WHERE id = p_report_id;
    
    -- Registrar en audit log
    PERFORM log_audit_event(
        p_user_id,
        (SELECT email FROM users WHERE id = p_user_id),
        'update',
        'reporte',
        p_report_id,
        jsonb_build_object('schedule', p_schedule, 'recipients', p_recipients),
        NULL,
        NULL
    );
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================
-- ÍNDICES ADICIONALES PARA OPTIMIZACIÓN
-- ==========================================

-- Índices para búsquedas frecuentes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

CREATE INDEX idx_leads_created_at_status ON leads(created_at, status);
CREATE INDEX idx_leads_conversion_date ON leads(conversion_date);

CREATE INDEX idx_transactions_client_id_type ON transactions(client_id, type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);

CREATE INDEX idx_staff_name ON staff(name);
CREATE INDEX idx_staff_role_active ON staff(role, active);

CREATE INDEX idx_attendance_staff_id_date ON attendance(staff_id, date);

CREATE INDEX idx_reports_created_by ON reports(created_by);
CREATE INDEX idx_reports_type_status ON reports(type, status);

-- ==========================================
-- COMENTARIOS FINALES
-- ==========================================

COMMENT ON SCHEMA usina_leads IS 'Esquema para la aplicación Usina Leads';

-- Añadir comentarios a las vistas
COMMENT ON VIEW dashboard_overview IS 'Vista para el dashboard principal con métricas generales';
COMMENT ON VIEW server_performance IS 'Vista para el rendimiento de servidores';
COMMENT ON VIEW client_performance IS 'Vista para el rendimiento de clientes';
COMMENT ON VIEW ad_performance IS 'Vista para el rendimiento de anuncios';
COMMENT ON VIEW financial_summary IS 'Vista para el resumen financiero mensual';