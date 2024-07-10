export const getInterporatedPath = (routePath: string, params: any) => {
   const regex = /:(\w+)/g;
   const extractedParameters = [];
   let match;
   do {
      match = regex.exec(routePath);
      match && extractedParameters.push(match[1]);
   } while (match);
   extractedParameters
      .filter((key) => !key.match(/^\d+$/g))
      .forEach((key) => {
         if (!params[key]) {
            throw new Error('Param '.concat(key, ' not found'));
         }
         routePath = routePath.replace(':'.concat(key), encodeURIComponent(params[key]));
      });
   return routePath;
};
export const paramsSufficientForPath = (routePath: string, params: any) => {
   const regex = /:(\w+)/g;
   const extractedParameters = [];
   let match;
   do {
      match = regex.exec(routePath);
      match && extractedParameters.push(match[1]);
   } while (match);

   return extractedParameters
      .filter(function (key) {
         return !key.match(/^\d+$/g);
      })
      .every(function (key) {
         return params[key];
      });
};

export const addSearchParams = (routePath: string, params: any) => {
   const keys = Object.keys(params);
   if (keys.length === 0) return routePath;
   return (
      routePath +
      '?' +
      keys
         .reduce(function (accumulator, key) {
            if (params[key]) {
               const value = (function () {
                  if (Array.isArray(params[key])) {
                     return params[key].join(',');
                  }
                  return String(params[key]);
               })();
               // @ts-ignore
               accumulator.push(''.concat(key, '=').concat(encodeURIComponent(value)));
            }
            return accumulator;
         }, [])
         .join('&')
   );
};
