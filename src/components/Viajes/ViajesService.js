export async function getViajesEnCurso() {
    try {
      let response = await fetch(
        'https://fletesmservice.herokuapp.com/api/envios',
      );
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
}

export async function cerrarViaje1(trailer_id, conductor_id) {
  try {
    let response = await fetch(
      `https://fletesmservice.herokuapp.com/api/envios?cond=${conductor_id}&trai=${trailer_id}`,
    );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

export const cerrarViaje = async (trailer_id, conductor_id) => {
  const settings = {
      method: 'PUT',
  };
  
  const data = await fetch(`https://fletesmservice.herokuapp.com/api/envios?cond=${conductor_id}&trai=${trailer_id}`, settings)
      .then(response => response.json())
      .then(json => {
          return json;
      })
      .catch(e => {
          return e
      });
  console.log(data, 'si')
  return data;
}

export async function getViajesTerminados() {
    try {
      let response = await fetch(
        'https://fletesmservice.herokuapp.com/api/envios_terminados',
      );
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
}