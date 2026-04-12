INSERT IGNORE INTO users (name, email, hashed_password, role, created_at, updated_at)
  VALUES ('Lucas', 'lucasportella@gmail.com', "senha12345", 'admin', NOW(), NOW())