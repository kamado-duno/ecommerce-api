import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "eCommerce API",
      version: "1.0.0",
      description:
        "A complete eCommerce backend API built with Express, TypeScript, and MongoDB",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["firstName", "lastName", "email", "password"],
          properties: {
            id: {
              type: "string",
              description: "The auto-generated id of the user",
            },
            firstName: {
              type: "string",
              description: "The first name of the user",
            },
            lastName: {
              type: "string",
              description: "The last name of the user",
            },
            email: {
              type: "string",
              format: "email",
              description: "The email of the user",
            },
            password: {
              type: "string",
              description: "The password of the user (hashed)",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Category: {
          type: "object",
          required: ["name"],
          properties: {
            id: {
              type: "string",
              description: "The auto-generated id of the category",
            },
            name: {
              type: "string",
              description: "The name of the category",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Product: {
          type: "object",
          required: ["name", "price", "categoryId"],
          properties: {
            id: {
              type: "string",
              description: "The auto-generated id of the product",
            },
            name: {
              type: "string",
              description: "The name of the product",
            },
            description: {
              type: "string",
              description: "The description of the product",
            },
            price: {
              type: "number",
              description: "The price of the product",
            },
            categoryId: {
              type: "string",
              description: "The category id reference",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Order: {
          type: "object",
          required: ["userId", "products"],
          properties: {
            id: {
              type: "string",
              description: "The auto-generated id of the order",
            },
            userId: {
              type: "string",
              description: "The user id reference",
            },
            products: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: {
                    type: "string",
                    description: "The product id",
                  },
                  quantity: {
                    type: "number",
                    description: "The quantity ordered",
                  },
                  priceAtPurchase: {
                    type: "number",
                    description: "The price at the time of purchase",
                  },
                },
              },
            },
            total: {
              type: "number",
              description: "The total price of the order",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Users",
        description: "User management endpoints",
      },
      {
        name: "Categories",
        description: "Category management endpoints",
      },
      {
        name: "Products",
        description: "Product management endpoints",
      },
      {
        name: "Orders",
        description: "Order management endpoints",
      },
    ],
  },
  apis: ["./dist/routers/*.js"], // path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);
