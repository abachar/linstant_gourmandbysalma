CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_name" text NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "purchases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sales" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_name" text NOT NULL,
	"delivery_datetime" timestamp with time zone NOT NULL,
	"delivery_address" text,
	"description" text,
	"amount" numeric(10, 2) NOT NULL,
	"deposit" numeric(10, 2) NOT NULL,
	"deposit_payment_method" text NOT NULL,
	"remaining" numeric(10, 2) NOT NULL,
	"remaining_payment_method" text NOT NULL,
	"quote_generated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_products_product_name" ON "products" USING btree ("product_name");--> statement-breakpoint
CREATE INDEX "idx_purchases_date" ON "purchases" USING btree ("date");--> statement-breakpoint
CREATE INDEX "idx_sales_delivery_datetime" ON "sales" USING btree ("delivery_datetime");
