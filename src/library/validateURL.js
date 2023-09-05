function validURL (url) {
  const pattern = (/^(ftp|http|https):\/\/[^ "]+$/);

  return pattern.test(url);
}
export default validURL;
