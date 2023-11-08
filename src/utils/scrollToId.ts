function scrollToId(id: string, yOffset = -80) {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: 'smooth' });
}

export default scrollToId;
