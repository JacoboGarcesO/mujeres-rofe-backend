export const createEmail = (
  templateId: string,
  subject: string,
  to: string,
  firstName: string,
  lastName: string,
  document: string,
  title: string,
) => {
  const templates = [register, notification];
  const template = templates.find((template) => template.id === templateId);
  return template?.template(to, subject, firstName, lastName, document, title);
};

const register = {
  id: 'register',
  template: (to: string, subject: string, firstName: string, lastName: string, document: string, title: string) => ({
    to,
    personalizations: [
      {
        to: [
          {
            email: to,
          },
          {
            email: 'mujeres.rofe@tocaunavida.org',
          },
        ],
      },
    ],
    from: {
      email: 'mujeres.rofe@tocaunavida.org',
      name: 'MujeresROFÉ',
    },
    subject,
    html: `
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <title>
      </title>
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
        #outlook a {
          padding: 0;
        }
    
        body {
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
    
        table,
        td {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
    
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
    
        p {
          display: block;
          margin: 13px 0;
        }
      </style>
      <!--[if mso]>
                <noscript>
                <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG/>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
                </xml>
                </noscript>
                <![endif]-->
      <!--[if lte mso 11]>
                <style type="text/css">
                  .mj-outlook-group-fix { width:100% !important; }
                </style>
                <![endif]-->
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
      <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
      </style>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:480px) {
          .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
          }
        }
      </style>
      <style media="screen and (min-width:480px)">
        .moz-text-html .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
      </style>
      <style type="text/css">
        @media only screen and (max-width:480px) {
          table.mj-full-width-mobile {
            width: 100% !important;
          }
    
          td.mj-full-width-mobile {
            width: auto !important;
          }
        }
      </style>
      <style type="text/css">
      </style>
    </head>
    
    <body style="word-spacing:normal;background-color:#eeeeee;">
      <div style="background-color:#eeeeee;">
        <!-- HEADER -->
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:400px;" width="400" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:400px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
            style="background:#ffffff;background-color:#ffffff;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="width:400px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix"
                    style="font-size:0;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr;">
                    <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td style="vertical-align:top;width:400px;" ><![endif]-->
                    <div class="mj-column-per-100 mj-outlook-group-fix"
                      style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                        width="100%">
                        <tbody>
                          <tr>
                            <td align="center" style="font-size:0px;padding:10px;word-break:break-word;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                style="border-collapse:collapse;border-spacing:0px;">
                                <tbody>
                                  <tr>
                                    <td style="width:120px;">
                                      <a href="https://mujeresrofe.com" target="_blank">
                                        <img alt="Mujeres ROFÉ" height="110"
                                          src="https://res.cloudinary.com/dbsypkhbz/image/upload/v1645393685/logo-2_q4jx6t.png"
                                          style="border:0;display:block;outline:none;text-decoration:none;height:110px;width:100%;font-size:13px;"
                                          width="120" />
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><![endif]-->
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:400px;" width="400" bgcolor="#cccccc" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#cccccc;background-color:#cccccc;margin:0px auto;max-width:400px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
            style="background:#cccccc;background-color:#cccccc;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:1px;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:400px;" width="400" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:400px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
            style="background:#ffffff;background-color:#ffffff;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:10px 0 0 0;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:400px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                      <tbody>
                        <tr>
                          <td style="vertical-align:top;padding:0;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                                    <div
                                      style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;">
                                      <h1>${title}</h1>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        <div style="height:10px;line-height:10px;">&#8202;</div>
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:400px;" width="400" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:400px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
            style="background:#ffffff;background-color:#ffffff;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:10px 0 0 0;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:400px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                      width="100%">
                      <tbody>
                        <tr>
                          <td align="center" style="font-size:0px;padding:10px 20px;word-break:break-word;">
                            <div
                              style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:20px;text-align:center;color:#000000; margin-bottom: 20px;">
                              Bienvenida ${firstName} ${lastName} a <strong>Mujeres ROFÉ</strong>, una comunidad que busca
                              facilitar la autosuficiencia e independencia económica de mujeres cabeza de hogar.</div>
                            <div
                              style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:20px;text-align:center;color:#000000;">
                              Ya tienes acceso a nuestro sitio web y en 24 horas hábiles podrás acceder también a nuestra
                              aplicación móvil de <strong>Mujeres ROFÉ.</strong></div>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 20px;word-break:break-word;">
                            <div
                              style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:20px;text-align:left;color:#000000;">
                              Estas son tus credenciales de acceso: <ul>
                                <li>Correo: ${to}</li>
                                <li>Contraseña: ${firstName.charAt(0).toUpperCase() + lastName.charAt(0).toLowerCase() +
                                  document}</li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 20px;word-break:break-word;">
                            <div
                              style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:20px;text-align:left;color:#000000;">
                              Estos son los pasos que debes seguir ahora:
                              <ol>
                                <li>
                                  Descarga la APP Mujeres ROFÉ desde PlayStore. En este enlace encontrarás un video tutorial
                                  de cómo descargar y navegar en la app: <a
                                    href="https://www.youtube.com/watch?v=a_pQdG9PYnM">Tutorial</a>
                                    <br>
                                    <br>
                                  Una vez ingreses a la APP, en la sección de PERFIL debes subir una foto tuya y actualizar
                                  tu perfil personal, así como también agregar tus usuarios de las redes sociales con las
                                  que cuentas.
                                </li>
                                <li>
                                  Ingresa al grupo de Facebook de Mujeres ROFÉ: <a href="https://www.facebook.com/groups/mujeresrofe">Grupo</a>
                                  <br>
                                  <br>
                                  Cualquier inquietud que tengas, no dudes en comunicarte con nuestro equipo para poder
                                  darte soporte.
    <br>
    <br>
                                  Esperamos que puedas disfrutar de los cuatro frentes que brinda esta comunidad para
                                  crecer, aprender y emprender.
                                </li>
                              </ol>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" vertical-align="middle"
                            style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                              style="border-collapse:separate;line-height:100%;">
                              <tbody>
                                <tr>
                                  <td align="center" bgcolor="#F93548" role="presentation"
                                    style="border:none;border-radius:20px;cursor:auto;mso-padding-alt:10px 25px;background:#F93548;"
                                    valign="middle">
                                    <a href="https://mujeresrofe.com"
                                      style="display:inline-block;background:#F93548;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:20px;"
                                      target="_blank"> Ir al sitio </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        <div style="height:10px;line-height:10px;">&#8202;</div>
        <!-- FOOTER -->
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:400px;" width="400" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="margin:0px auto;max-width:400px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:10px 0 10px 0;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:400px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                      width="100%">
                      <tbody>
                        <tr>
                          <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div
                              style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1;text-align:center;color:#9B9B9B;">
                              <span style="display: block; margin-bottom: 10px;">CRR 7 # 109 - 07 / Mujeres ROFÉ / +57 323
                                2833801</span>
                              <span style="display: block; margin-bottom: 10px;">soporte@tocaunavida.org</span>
                              <b>Si se le presenta alguna inquietud por favor haga uso de nuestros canales de
                                información.</b>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
      </div>
    </body>
    
    </html>
    `,
  }),
};

const notification = {
  id: 'notification',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  template: (to: string, subject: string, firstName: string, lastName: string, _document: string, title: string) => ({
    to,
    personalizations: [
      {
        to: [
          {
            email: 'soporte@tocaunavida.org',
          },
          {
            email: 'mujeres.rofe@tocaunavida.org',
          },
          {
            email: to,
          },
        ],
      },
    ],
    from: {
      email: 'mujeres.rofe@tocaunavida.org',
      name: 'MujeresROFÉ',
    },
    subject,
    html: `
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
      <title>
      </title>
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
        #outlook a {
          padding: 0;
        }

        body {
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }

        table,
        td {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }

        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }

        p {
          display: block;
          margin: 13px 0;
        }

      </style>
      <!--[if mso]>
            <noscript>
            <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            </noscript>
            <![endif]-->
      <!--[if lte mso 11]>
            <style type="text/css">
              .mj-outlook-group-fix { width:100% !important; }
            </style>
            <![endif]-->
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
      <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);

      </style>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:480px) {
          .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
          }
        }

      </style>
      <style media="screen and (min-width:480px)">
        .moz-text-html .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }

      </style>
      <style type="text/css">
        @media only screen and (max-width:480px) {
          table.mj-full-width-mobile {
            width: 100% !important;
          }

          td.mj-full-width-mobile {
            width: auto !important;
          }
        }

      </style>
      <style type="text/css">
      </style>
    </head>

    <body style="word-spacing:normal;background-color:#eeeeee;">
      <div style="background-color:#eeeeee;">
        <!-- HEADER -->
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:400px;" width="400" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:400px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="width:400px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr;">
                    <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td style="vertical-align:top;width:400px;" ><![endif]-->
                    <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                        <tbody>
                          <tr>
                            <td align="center" style="font-size:0px;padding:10px;word-break:break-word;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                <tbody>
                                  <tr>
                                    <td style="width:120px;">
                                      <a href="https://mujeresrofe.com" target="_blank">
                                        <img alt="Mujeres ROFÉ" height="110" src="https://res.cloudinary.com/dbsypkhbz/image/upload/v1645393685/logo-2_q4jx6t.png" style="border:0;display:block;outline:none;text-decoration:none;height:110px;width:100%;font-size:13px;" width="120" />
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><![endif]-->
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:400px;" width="400" bgcolor="#cccccc" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#cccccc;background-color:#cccccc;margin:0px auto;max-width:400px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#cccccc;background-color:#cccccc;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:1px;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:400px;" width="400" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:400px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:10px 0 0 0;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:400px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                      <tbody>
                        <tr>
                          <td style="vertical-align:top;padding:0;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;">
                                      <h1>${title}</h1>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        <div style="height:10px;line-height:10px;">&#8202;</div>
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:400px;" width="400" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:400px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:10px 0 0 0;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:400px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                      <tbody>
                        <tr>
                          <td align="center" style="font-size:0px;padding:10px 20px;word-break:break-word;">
                            <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:20px;text-align:center;color:#000000;">Hola, ${firstName} ${lastName}, recibimos tu formulario de aplicación, vamos a validar tus datos y prontamente estaremos comunicándonos contigo para indicarte los pasos que debes seguir.</div>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                              <tbody>
                                <tr>
                                  <td align="center" bgcolor="#F93548" role="presentation" style="border:none;border-radius:20px;cursor:auto;mso-padding-alt:10px 25px;background:#F93548;" valign="middle">
                                    <a href="https://mujeresrofe.com" style="display:inline-block;background:#F93548;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:20px;" target="_blank"> Ir al sitio </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        <div style="height:10px;line-height:10px;">&#8202;</div>
        <!-- FOOTER -->
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:400px;" width="400" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="margin:0px auto;max-width:400px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:10px 0 10px 0;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:400px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                      <tbody>
                        <tr>
                          <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1;text-align:center;color:#9B9B9B;"><span style="display: block; margin-bottom: 10px;">CRR 7 # 109 - 07 / Mujeres ROFÉ / +57 323 2833801</span>
                              <span style="display: block; margin-bottom: 10px;">soporte@tocaunavida.org</span>
                              <b>Si se le presenta alguna inquietud por favor haga uso de nuestros canales de información.</b>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
      </div>
    </body>
    </html>
    `,
  }),
};
