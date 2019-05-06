
export async function getConductores() {
    try {
      let response = await fetch(
        'https://fletesmservice.herokuapp.com/api/conductores',
      );
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
}

export const updateConductor = async (conductor) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(conductor)
    };

    const data = await fetch(`https://fletesmservice.herokuapp.com/api/conductores/update?id=${conductor.conductor_id}`, settings)
        .then(response => response.json())
        .then(json => {
            return json;
        })
        .catch(e => {
            return e
        });

    return data;
}