-- Create extension for UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Categorías
CREATE TABLE categorias (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  descripcion TEXT,
  imagen_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Productos
CREATE TABLE productos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
  nombre TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  imagenes JSONB DEFAULT '[]'::jsonb, -- Array de URLs
  tallas JSONB DEFAULT '[]'::jsonb,
  colores JSONB DEFAULT '[]'::jsonb,
  destacado BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  nombre TEXT,
  apellidos TEXT,
  telefono TEXT,
  direccion JSONB,
  rol TEXT DEFAULT 'cliente' CHECK (rol IN ('cliente', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Autocreate profile trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nombre, apellidos)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'nombre', new.raw_user_meta_data->>'apellidos');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Pedidos
CREATE TABLE pedidos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'pagado', 'enviado', 'entregado', 'cancelado')),
  total DECIMAL(10,2) NOT NULL,
  direccion_envio JSONB NOT NULL,
  metodo_pago TEXT NOT NULL,
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Items del Pedido
CREATE TABLE items_pedido (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  pedido_id UUID REFERENCES pedidos(id) ON DELETE CASCADE,
  producto_id UUID REFERENCES productos(id) ON DELETE SET NULL,
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  precio_unitario DECIMAL(10,2) NOT NULL,
  talla TEXT,
  color TEXT
);

-- 6. Mensajes (Contacto)
CREATE TABLE mensajes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  asunto TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  leido BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS POLICIES --

-- Categorias
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categorias visibles para todos" ON categorias FOR SELECT USING (true);
CREATE POLICY "Solo admins modifican categorias" ON categorias USING (
  auth.uid() IN (SELECT id FROM profiles WHERE rol = 'admin')
);

-- Productos
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Productos visibles para todos" ON productos FOR SELECT USING (true);
CREATE POLICY "Solo admins modifican productos" ON productos USING (
  auth.uid() IN (SELECT id FROM profiles WHERE rol = 'admin')
);

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuarios ven su propio perfil" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Usuarios actualizan su propio perfil" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins ven todos los perfiles" ON profiles FOR SELECT USING (
  auth.uid() IN (SELECT id FROM profiles WHERE rol = 'admin')
);

-- Pedidos
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuarios ven sus propios pedidos" ON pedidos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios crean sus pedidos" ON pedidos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins gestionan pedidos" ON pedidos USING (
  auth.uid() IN (SELECT id FROM profiles WHERE rol = 'admin')
);

-- Items_pedido
ALTER TABLE items_pedido ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuarios ven items de sus pedidos" ON items_pedido FOR SELECT USING (
  pedido_id IN (SELECT id FROM pedidos WHERE user_id = auth.uid())
);
CREATE POLICY "Usuarios insertan items a sus pedidos" ON items_pedido FOR INSERT WITH CHECK (
  pedido_id IN (SELECT id FROM pedidos WHERE user_id = auth.uid())
);
CREATE POLICY "Admins gestionan items" ON items_pedido USING (
  auth.uid() IN (SELECT id FROM profiles WHERE rol = 'admin')
);

-- Mensajes
ALTER TABLE mensajes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cualquiera inserta mensajes" ON mensajes FOR INSERT WITH CHECK (true);
CREATE POLICY "Solo admins ven mensajes" ON mensajes FOR SELECT USING (
  auth.uid() IN (SELECT id FROM profiles WHERE rol = 'admin')
);
CREATE POLICY "Solo admins actualizan mensajes" ON mensajes FOR UPDATE USING (
  auth.uid() IN (SELECT id FROM profiles WHERE rol = 'admin')
);
CREATE POLICY "Solo admins eliminan mensajes" ON mensajes FOR DELETE USING (
  auth.uid() IN (SELECT id FROM profiles WHERE rol = 'admin')
);
