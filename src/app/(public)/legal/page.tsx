import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-container w-full h-[160px] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-80"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold font-headline tracking-tighter">Información Legal</h1>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow bg-surface py-12 px-4 md:px-8 max-w-screen-2xl mx-auto w-full">
        {/* Tab Navigation */}
        <div className="bg-surface-container-lowest shadow-[0px_20px_40px_rgba(20,48,103,0.06)] rounded-lg mb-12 sticky top-[80px] z-30 overflow-x-auto no-scrollbar">
          <ul className="flex whitespace-nowrap min-w-max md:min-w-0 md:justify-center">
            <li>
              <Link href="#privacidad" className="block px-8 py-4 bg-primary-container text-white font-bold font-label transition-colors">
                Política de Privacidad
              </Link>
            </li>
            <li>
              <Link href="#terminos" className="block px-8 py-4 bg-surface-container-lowest text-primary-container hover:bg-surface-container-low font-medium font-label transition-colors">
                Términos de Uso
              </Link>
            </li>
            <li>
              <Link href="#cookies" className="block px-8 py-4 bg-surface-container-lowest text-primary-container hover:bg-surface-container-low font-medium font-label transition-colors">
                Política de Cookies
              </Link>
            </li>
            <li>
              <Link href="#aviso" className="block px-8 py-4 bg-surface-container-lowest text-primary-container hover:bg-surface-container-low font-medium font-label transition-colors">
                Aviso Legal
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
          {/* Left Sidebar (Desktop Only) */}
          <aside className="hidden md:block w-1/4 sticky top-[180px] self-start">
            <nav className="bg-surface-container-lowest rounded-lg p-6 shadow-[0px_20px_40px_rgba(20,48,103,0.06)]">
              <h3 className="font-headline font-bold text-lg mb-4 text-primary">Contenido</h3>
              <ul className="space-y-3 font-label text-sm text-on-surface-variant">
                <li><Link href="#info-recopilamos" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary-container font-bold">1.</span> Información que recopilamos</Link></li>
                <li><Link href="#como-usamos" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary-container font-bold">2.</span> Cómo usamos tu información</Link></li>
                <li><Link href="#cookies-seccion" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary-container font-bold">3.</span> Cookies</Link></li>
                <li><Link href="#tus-derechos" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary-container font-bold">4.</span> Tus derechos</Link></li>
                <li><Link href="#contacto" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary-container font-bold">5.</span> Contacto</Link></li>
              </ul>
              <div className="mt-8 pt-4 border-t border-outline-variant/20 text-xs text-outline">
                Última actualización: abril 2026
              </div>
            </nav>
          </aside>

          {/* Right Content Area */}
          <article className="w-full md:w-3/4 bg-surface-container-lowest rounded-lg shadow-[0px_20px_40px_rgba(20,48,103,0.06)] p-8 md:p-12 relative max-w-[720px]">
             <div className="absolute top-8 right-8 bg-surface-container text-on-surface-variant text-xs font-bold px-3 py-1 rounded-full border border-outline-variant/30 hidden sm:block">
                Actualizado: Abril 2026
            </div>
            <div className="prose prose-slate max-w-none prose-headings:font-headline prose-headings:text-primary prose-p:text-on-surface prose-p:leading-relaxed prose-a:text-surface-tint prose-a:no-underline hover:prose-a:underline">
              <h2 id="info-recopilamos" className="text-2xl font-bold mb-6 pl-4 border-l-4 border-primary-container mt-0">1. Información que recopilamos</h2>
              <p className="mb-8 text-base leading-[1.7]">
                En Confecciones Liss, valoramos profundamente su privacidad y nos comprometemos a proteger sus datos personales. Recopilamos información que usted nos proporciona directamente cuando realiza una compra, se suscribe a nuestro boletín, crea una cuenta o se comunica con nuestro servicio de atención al cliente. Esta información puede incluir su nombre, dirección de correo electrónico, dirección de envío y facturación, número de teléfono y detalles de pago. Además, recopilamos automáticamente ciertos datos sobre su dispositivo y su interacción con nuestro sitio web, como su dirección IP, tipo de navegador, páginas visitadas y tiempos de acceso, utilizando tecnologías como cookies y balizas web para mejorar su experiencia.
              </p>

              <h2 id="como-usamos" className="text-2xl font-bold mb-6 pl-4 border-l-4 border-primary-container">2. Cómo usamos tu información</h2>
              <p className="mb-8 text-base leading-[1.7]">
                Utilizamos la información recopilada para diversos fines esenciales para la operatividad y mejora de nuestros servicios. Principalmente, empleamos sus datos para procesar y entregar sus pedidos, gestionar su cuenta, procesar pagos y proporcionarle soporte al cliente. También utilizamos esta información para enviarle comunicaciones operativas, como confirmaciones de pedidos y actualizaciones de envío. Si ha optado por recibir comunicaciones de marketing, podremos utilizar sus datos para enviarle ofertas promocionales, noticias y actualizaciones sobre nuevos productos que creemos que pueden ser de su interés. Puede optar por no recibir estos correos en cualquier momento. Asimismo, analizamos los datos de uso para comprender mejor cómo interactúan los usuarios con nuestro sitio web, lo que nos permite optimizar el diseño, la funcionalidad y las ofertas de productos, garantizando una experiencia de usuario más personalizada y eficiente.
              </p>

              <h2 id="cookies-seccion" className="text-2xl font-bold mb-6 pl-4 border-l-4 border-primary-container">3. Cookies</h2>
              <p className="mb-8 text-base leading-[1.7]">
                Nuestro sitio web utiliza "cookies" y tecnologías de seguimiento similares para rastrear la actividad en nuestro servicio y mantener cierta información. Las cookies son archivos con una pequeña cantidad de datos que pueden incluir un identificador único anónimo. Se envían a su navegador desde un sitio web y se almacenan en su dispositivo. Utilizamos cookies de sesión, que expiran al cerrar el navegador, y cookies persistentes, que permanecen en su dispositivo hasta que se eliminan, para recordar sus preferencias, facilitar el inicio de sesión automático y analizar el tráfico del sitio. Usted puede instruir a su navegador para que rechace todas las cookies o para que indique cuándo se esté enviando una cookie. Sin embargo, si no acepta las cookies, es posible que no pueda utilizar algunas porciones de nuestro servicio.
              </p>

              <h2 id="tus-derechos" className="text-2xl font-bold mb-6 pl-4 border-l-4 border-primary-container">4. Tus derechos</h2>
              <p className="mb-8 text-base leading-[1.7]">
                Usted tiene derechos específicos con respecto a sus datos personales, de acuerdo con las leyes de protección de datos aplicables. Estos derechos incluyen:
              </p>
              <ul className="list-disc pl-8 mb-8 space-y-2 text-base leading-[1.7] marker:text-primary-container text-on-surface">
                <li>El derecho a acceder, actualizar o eliminar la información que tenemos sobre usted.</li>
                <li>El derecho de rectificación: tiene derecho a que su información sea rectificada si es inexacta o incompleta.</li>
                <li>El derecho a oponerse: tiene derecho a oponerse a nuestro procesamiento de sus datos personales.</li>
                <li>El derecho de restricción: tiene derecho a solicitar que restrinjamos el procesamiento de su información personal.</li>
                <li>El derecho a la portabilidad de datos: tiene derecho a recibir una copia de la información que tenemos sobre usted en un formato estructurado, legible por máquina y de uso común.</li>
                <li>El derecho a retirar el consentimiento: también tiene derecho a retirar su consentimiento en cualquier momento cuando nos hayamos basado en su consentimiento para procesar su información personal.</li>
              </ul>

              <h2 id="contacto" className="text-2xl font-bold mb-6 pl-4 border-l-4 border-primary-container">5. Contacto</h2>
              <p className="text-base leading-[1.7]">
                Si tiene alguna pregunta sobre esta Política de Privacidad, por favor contáctenos. Puede enviarnos un correo electrónico a <a href="mailto:legal@confeccionesliss.com" className="font-medium text-primary hover:underline">legal@confeccionesliss.com</a> o comunicarse a través de nuestro formulario de contacto en el sitio web. Nuestro equipo de soporte estará encantado de asistirle y resolver cualquier duda o inquietud que pueda tener respecto al manejo de sus datos personales.
              </p>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
