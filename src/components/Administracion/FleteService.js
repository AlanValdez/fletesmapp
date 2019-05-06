
export async function getFletes() {
    try {
      let response = await fetch(
        'https://fletesmservice.herokuapp.com/api/trailers',
      );
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
}

export const updateFlete = async (flete) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(flete)
    };

    const data = await fetch(`https://fletesmservice.herokuapp.com/api/trailers/update?id=${flete.trailer_id}`, settings)
        .then(response => response.json())
        .then(json => {
            return json;
        })
        .catch(e => {
            return e
        });

    return data;
}