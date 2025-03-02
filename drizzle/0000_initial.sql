CREATE TABLE IF NOT EXISTS users (
  id text PRIMARY KEY,
  company_name text NOT NULL,
  company_description text NOT NULL,
  company_logo text,
  industry text NOT NULL,
  tokens integer NOT NULL DEFAULT 0,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL REFERENCES users(id),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  badges text NOT NULL DEFAULT '',
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL REFERENCES users(id),
  payment_id text NOT NULL,
  tokens integer NOT NULL,
  amount integer NOT NULL,
  status text NOT NULL,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL REFERENCES users(id),
  product_id uuid REFERENCES products(id),
  conversation jsonb NOT NULL,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);