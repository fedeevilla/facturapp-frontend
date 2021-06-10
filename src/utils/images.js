const httpToHttps = (url) => {
  if (!url) {
    return;
  }
  if (url.match("http:")) {
    return url.replace("http:", "https:");
  }

  return url;
};

export const getOptimizedAvatar = (url) => {
  if (!url) {
    return;
  }

  return httpToHttps(
    url.replace("upload", "upload/f_auto,q_auto/w_38,c_scale")
  );
};

export const getOptimizedImage = (url) => {
  if (!url) {
    return;
  }

  return httpToHttps(url.replace("upload", "upload/f_auto,q_auto"));
};
