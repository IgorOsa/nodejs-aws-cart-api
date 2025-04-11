CREATE TABLE user (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar NOT NULL,
	email varchar NULL,
	"password" varchar NOT NULL,
	CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id)
);

CREATE TABLE carts (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	user_id uuid NOT NULL,
	created_at timestamp DEFAULT now() NOT NULL,
	updated_at timestamp DEFAULT now() NOT NULL,
	status "carts_status_enum" DEFAULT 'OPEN' NOT NULL,
	CONSTRAINT carts_pkey PRIMARY KEY (id)
);

CREATE TABLE cart_items (
	cart_id uuid NOT NULL,
	product_id uuid NOT NULL,
	count int4 NOT NULL,
	price numeric(10, 2) DEFAULT '0' NOT NULL,
	CONSTRAINT "PK_dba960dbfd8636893d3c7acb18d" PRIMARY KEY (cart_id, product_id)
);

ALTER TABLE cart_items ADD CONSTRAINT "FK_6385a745d9e12a89b859bb25623" FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE;

CREATE TABLE orders (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	items json NOT NULL,
	cart_id uuid NOT NULL,
	total numeric(10, 2) NOT NULL,
	status "orders_status_enum" DEFAULT 'OPEN' NOT NULL,
	payment json NOT NULL,
	delivery json NOT NULL,
	user_id uuid NOT NULL,
	"comments" text NULL,
	created_at timestamp DEFAULT now() NOT NULL,
	updated_at timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY (id)
);

ALTER TABLE orders ADD CONSTRAINT "FK_f42b1d95404c45b10bf2451d814" FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE SET NULL;

INSERT INTO user (id,name,email,"password") VALUES
	 ('300b84df-168c-46e9-be12-f97be5bf0d6c','IgorOsa','test@example.com','TEST_PASSWORD');

INSERT INTO carts (id,user_id,created_at,updated_at,status) VALUES
	 ('f7ede26c-a642-4b6a-973a-110ba1de33dd','300b84df-168c-46e9-be12-f97be5bf0d6c','2025-04-06 12:05:26.007','2025-04-06 10:24:43.637195','ORDERED'),
	 ('4543b9df-ec8b-433c-a9b2-d74aeb5001b4','300b84df-168c-46e9-be12-f97be5bf0d6c','2025-04-06 10:26:11.135','2025-04-06 10:27:01.047069','ORDERED'),
	 ('3bf14bc0-4d0b-46b5-b7e9-44bcc2bd773a','300b84df-168c-46e9-be12-f97be5bf0d6c','2025-04-06 10:27:35.398','2025-04-06 10:27:35.398','OPEN');

INSERT INTO cart_items (cart_id,product_id,count,price) VALUES
	 ('f7ede26c-a642-4b6a-973a-110ba1de33dd','b719dbfa-389c-4271-ab71-a0efd4c47790',5,3.50),
	 ('4543b9df-ec8b-433c-a9b2-d74aeb5001b4','b719dbfa-389c-4271-ab71-a0efd4c47790',5,3.50),
	 ('4543b9df-ec8b-433c-a9b2-d74aeb5001b4','36163b8f-bcbc-4c22-8d9c-5f911cf06cb1',2,15.00),
	 ('4543b9df-ec8b-433c-a9b2-d74aeb5001b4','66ab5749-31e0-42fb-9df3-302997131a5f',1,12.50),
	 ('3bf14bc0-4d0b-46b5-b7e9-44bcc2bd773a','66ab5749-31e0-42fb-9df3-302997131a5f',2,12.50);
	 
INSERT INTO orders (id,items,cart_id,total,status,payment,delivery,user_id,"comments",created_at,updated_at) VALUES
	 ('434290ff-0a66-41c0-b921-8e501500e2a3','[{"productId":"b719dbfa-389c-4271-ab71-a0efd4c47790","count":5}]','f7ede26c-a642-4b6a-973a-110ba1de33dd',17.50,'OPEN','""','"{\"comment\":\"Test Comment\",\"address\":\"Some Address\",\"lastName\":\"Dow\",\"firstName\":\"John\"}"','300b84df-168c-46e9-be12-f97be5bf0d6c',NULL,'2025-04-06 13:24:41.826','2025-04-06 13:24:41.826'),
	 ('e9729b0f-8753-4c22-81af-374707727741','[{"productId":"b719dbfa-389c-4271-ab71-a0efd4c47790","count":5},{"productId":"36163b8f-bcbc-4c22-8d9c-5f911cf06cb1","count":2},{"productId":"66ab5749-31e0-42fb-9df3-302997131a5f","count":1}]','4543b9df-ec8b-433c-a9b2-d74aeb5001b4',60.00,'OPEN','""','"{\"comment\":\"Test Comment\",\"address\":\"Some Address\",\"lastName\":\"Dow\",\"firstName\":\"John\"}"','300b84df-168c-46e9-be12-f97be5bf0d6c',NULL,'2025-04-06 13:27:00.892','2025-04-06 13:27:00.892');
