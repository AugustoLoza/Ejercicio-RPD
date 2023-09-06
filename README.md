# Ejercico-RPD


Microservicio REST API en Node.js
Este proyecto es un microservicio REST API desarrollado en Node.js con Express.js y una base de datos SQLite. El microservicio incluye endpoints para recibir datos, modificarlos y consultarlos.

Requisitos
Node.js (versión X.X.X)
npm (Node Package Manager)
Express.js
SQLite (base de datos recomendada)

Configuración

Clona el repositorio:

git clone https://github.com/tu-usuario/tu-proyecto.git

Instala las dependencias:

npm install

Ejecuta el microservicio:

npm start

El servicio estará disponible en http://localhost:3000.

El servicio de Swagger estará disponible en http://localhost:3000/api-docs/#/.

Dentro del Proyecto hay un .env.example con las variables de entorno del .env

La base de datos viene ya creada en SqLite con el nombre de "RPD", se puede cambiar el nombre en .env y automaticamente crea la base de datos con su respectivas tablas

Endpoints

POST /input/:my_target_field
Este endpoint permite enviar datos en formato JSON para su modificación y almacenamiento en la base de datos. El parámetro my_target_field puede ser uno de los siguientes: "field_1", "author", o "description". El texto se convierte automáticamente a mayúsculas. Si se proporciona un campo no válido, se devuelve un error.

GET /get_data/:id
Este endpoint recibe un ID de documento guardado en la base de datos y devuelve su contenido.