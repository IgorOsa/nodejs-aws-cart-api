INSERT INTO user (id, "name", email, "password") VALUES('300b84df-168c-46e9-be12-f97be5bf0d6c', 'IgorOsa', 'test@example.com', 'TEST_PASSWORD');

INSERT INTO carts (id,user_id,created_at,updated_at,status) VALUES
	 ('a5cb05c9-ebce-4f17-9550-b67debd67ffd','300b84df-168c-46e9-be12-f97be5bf0d6c','2025-04-05 22:04:53.329','2025-04-05 22:04:53.329','ORDERED'),
	 ('1bde8d9b-9214-417e-9337-cb38e5226f7d','300b84df-168c-46e9-be12-f97be5bf0d6c','2025-04-06 08:31:10.699','2025-04-06 08:31:10.699','OPEN');

INSERT INTO cart_items (cart_id,product_id,count,price) VALUES
	 ('a5cb05c9-ebce-4f17-9550-b67debd67ffd','f9488065-7452-4e9e-86db-65ab5fafe62a',3,7.99),
	 ('a5cb05c9-ebce-4f17-9550-b67debd67ffd','66ab5749-31e0-42fb-9df3-302997131a5f',2,12.50),
	 ('1bde8d9b-9214-417e-9337-cb38e5226f7d','66ab5749-31e0-42fb-9df3-302997131a5f',1,12.50),
	 ('1bde8d9b-9214-417e-9337-cb38e5226f7d','36163b8f-bcbc-4c22-8d9c-5f911cf06cb1',2,15.00),
	 ('1bde8d9b-9214-417e-9337-cb38e5226f7d','b719dbfa-389c-4271-ab71-a0efd4c47790',5,3.50);
