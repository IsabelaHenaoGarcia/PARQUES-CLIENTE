// backend.js
export const enviarTablero = () => {
  console.log("Enviando movimiento al backend...");
  console.log("Tablero serializado como JSON...");
  console.log("Movimiento enviado correctamente");
  
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Backend procesando movimiento...");
      console.log(" Movimiento aceptado por el servidor");
      resolve({ 
        success: true, 
        message: "Movimiento procesado exitosamente" 
      });
    }, 800);
  });
};