INSERT INTO user (id, "name", email, "password") VALUES('300b84df-168c-46e9-be12-f97be5bf0d6c', 'IgorOsa', 'test@example.com', 'TEST_PASSWORD');

INSERT INTO carts (id, user_id, created_at, updated_at, status) 
VALUES 
    ('a5cb05c9-ebce-4f17-9550-b67debd67ffd', '300b84df-168c-46e9-be12-f97be5bf0d6c', now(), now(), 'OPEN');
    
INSERT INTO cart_items (cart_id, product_id, count, price)
VALUES
    ('a5cb05c9-ebce-4f17-9550-b67debd67ffd', 'f9488065-7452-4e9e-86db-65ab5fafe62a', 3, 7.99),
    ('a5cb05c9-ebce-4f17-9550-b67debd67ffd', '66ab5749-31e0-42fb-9df3-302997131a5f', 2, 12.50);
