export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Money Manager API",
      version: "1.0.0",
      description: "API documentation for Money Manager application",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./swagger/*.js"],
};
