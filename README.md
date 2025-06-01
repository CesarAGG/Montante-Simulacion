# Visualizador Interactivo del Método de Montante

![Svelte](https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Este proyecto es una aplicación web interactiva desarrollada con Svelte y TypeScript que permite visualizar y entender el **Método de Montante**. Desarrollado por René Mario Montante Prado, una de sus principales ventajas es que opera manteniendo los números enteros a lo largo del proceso, lo que minimiza errores de redondeo y facilita los cálculos manuales. Es una herramienta educativa que demuestra paso a paso cómo resolver sistemas de ecuaciones lineales, y adicionalmente, puede calcular la matriz adjunta e inversa.

## ✨ Características

*   **Visualización Paso a Paso:** Observa cómo la matriz se transforma en cada iteración del Método de Montante.
*   **Trabajo con Enteros:** La principal característica del Método de Montante es que mantiene los valores enteros durante las operaciones, evitando fracciones y errores de redondeo.
*   **Entrada Dinámica:** Define el número de variables y los coeficientes de tu sistema de ecuaciones lineales.
*   **Resaltado de Cambios:** Los elementos de la matriz que se modifican en cada paso son resaltados visualmente.
*   **Información en Tiempo Real:** Muestra el pivote actual, el pivote anterior y mensajes explicativos del proceso.
*   **Cálculo Opcional:** Obtén la matriz adjunta y la matriz inversa una vez que el método ha finalizado.
*   **Diseño Responsivo:** Adaptado para ser accesible en diferentes tamaños de pantalla.

## 🚀 Demo en Vivo

¡Explora la aplicación funcionando en vivo!
[**Ver Demo en Vercel**](https://montante-method.vercel.app)

## 🛠️ Tecnologías Utilizadas

*   **Svelte:** Framework para la construcción de interfaces de usuario reactivas.
*   **TypeScript:** Lenguaje de programación que añade tipado estático a JavaScript, mejorando la robustez del código.
*   **HTML & CSS:** Para la estructura y estilos de la interfaz.
*   **Vercel:** Plataforma para el despliegue rápido y sencillo de la aplicación.

## 💡 Cómo Usar

1.  **Abre la aplicación** desde el enlace de la demo en vivo.
2.  **Define el número de variables** de tu sistema de ecuaciones lineales.
3.  **Introduce los coeficientes** de las ecuaciones y los valores del vector de solución.
4.  **Marca la casilla** "Desea obtener además la adjunta e inversa?" si necesitas estos cálculos adicionales.
5.  Haz clic en el botón **"Empezar"**.
6.  Utiliza el botón **"Siguiente"** para avanzar paso a paso en la resolución del método.
7.  Observa los cambios en la matriz, los pivotes y los mensajes informativos.
8.  Una vez finalizado, se mostrarán las soluciones del sistema y, si lo elegiste, las matrices adjunta e inversa.
9.  Puedes hacer clic en **"Reset"** para comenzar con un nuevo sistema.

## ⚙️ Instalación Local (Para Desarrolladores)

Si deseas ejecutar este proyecto localmente:

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/nombre-de-tu-repo.git
    cd nombre-de-tu-repo
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que te indique la terminal).

4.  Para construir la aplicación para producción:
    ```bash
    npm run build
    ```

## 📄 Licencia

Este proyecto está bajo la Licencia GNU General Public License v3.0. Consulta el archivo `LICENSE` para más detalles.
