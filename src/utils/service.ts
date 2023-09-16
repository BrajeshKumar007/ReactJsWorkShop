
/**
 * Generate base URL including OMDB required params
 * @param {string} url
 * @returns {string}
 */
const getBaseURL = (url: string): string => {
  return `${url}`;
};
// Function to rename a key in an object
function renameKey(obj: any, oldKey: any, newKey: any) {
  if (obj.hasOwnProperty(oldKey)) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
}
/**
 * Service object exported to use across application
 */
const service = {
  get: async (url: string, params: string) => {
    try {
      let response = await fetch(
        `${getBaseURL(url + params)}`,
        {
          method: "GET",
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // application/x-www-form-urlencoded, application/json
          },
        }
      ).then((res) => res.json());

      // if (!response.page.title) {
      //   throw Error(response.Error);
      // } else {
        const contentItems = response.page["content-items"].content;
        contentItems.forEach((item:any) => {
          renameKey(item, "poster-image", "Poster");
        });
        let obj ={
          contentItems,
          "totalContent":response.page["total-content-items"]
        }        
        return obj;
      // }
    } catch (error) {
      throw error;
    }
  },
  post: async (url: string, data: object) => {
    const response = await fetch(getBaseURL(url), {
      method: "POST",
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // application/x-www-form-urlencoded, application/json
      },
      body: JSON.stringify(data),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  },
};

export default service;
