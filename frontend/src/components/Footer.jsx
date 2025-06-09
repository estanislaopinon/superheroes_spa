function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>
          &copy; {currentYear} Superhéroes SPA. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
