[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/QoAEAasJ)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=11088601)
# Obligatorio - FIS
|                    Identificación                                         |
|:-------------------------------------------------------------------------:|
|        Fundamentos de Ingeniería de Software                              |
|                         M4B                                               |
|             Gonzalo Terra, Tomás Zelaschi                                 |
|              Docentes:  Alejandro Adorjan, Gerardo Maturro                |
|     https://github.com/ORT-FIS-2022S2/obigatorio1-FIS-terra-zelaschi.git  |

## Repositorio Git
Creamos un repositorio remoto en GitHub, cada integrante del grupo clona el repositorio para hacerlo local. Cada integrante trabaja en su repositorio local 
y cuando es necesario empuja los cambios al repositorio remoto de Github.

### Los comandos de Git que se utilizaron en detalle:
* git clone urlDelRepo
	* Nos permite clonar el repositorio para tener una version local
* git add .
	* Agrega todos los archivos modificados en la ruta que se encuentre el usuario a staging para hacer un commit.
* git commit -m "mensaje"
	* Crea un commit de la rama en la que se encuentre el usuario con una descripcion acorde
* git pull origin nombreRama
	* Baja los cambios hechos del repositorio remoto a la máquina local.
* git push origin nombreRama
	* Sube los cambios realizados (commits), en nombreRama a el repositorio remoto.
* git merge
	*  Se utiliza para unir dos ramas.
* git branch
	* Nos permite ver en que rama estamos trabajando.
* git checkout -b nombreRamaNueva
	* Crea una nueva rama localmente con el nombre nombreRamaNueva y nos cambia de rama actual a nombreRamaNueva
* git diff
	* Identificamos cambios en el repositorio

# Versionado
Mencionado anteriormente, centralizamos el trabajo en un repositorio remoto hosteado en GitHub y cada integrante trabaja en un repositorio local.
La filosofía principal para el versionado seguida por el grupo es separar el repositorio en dos ramas:
conflictos
* rama **main**: Rama principal del proyecto en la que se centraliza el código, la idea es que en esta rama no se lleve todo el trabajo en curso, sino solo subir versiones estables
  con la idea de no editarlas, obviamente que si se quiere realizar algun cambio se puede, siempre y cuando el push en la misma sea completo.
* rama **dev**: Abreviatura de "develop", es la rama utilizada para el desarrollo diario y continuo de la aplicación. Nosotros vamos trabajando y haciendo cambios en esta rama hasta 
  que llegamos a una version estable y ahi la podemos mezclar (hacer merge) con la rama main. La idea de esta rama es que la rama main quede limpia y poder trabajar cómodamente 
  sobre partes incompletas con posibles errores en vez de trabajar cautelosamente en main con miedo a revertir trabajo en el caso de un error.
También para facilitar partes del trabajo donde es útil escribir e ir avanzando en la misma parte del proyecto al mismo tiempo de manera remota decidimos utilizar la 
extensión del programa "Visual Studio Code" llamada "Live Share", donde podemos editar el mismo archivo en vivo y agregar notas sobre partes que vamos realizando o mejorando 
al mismo tiempo.

![Commits-1](.docs/github-1.png)
![Commits-2](docs/github-2.png)


# Elicitación


## Entrevista

Le realizamos una entrevista a Lourdes Segura, familiar de uno de los integrantes del equipo de trabajo, quien es un usuario diario de una aplicación para comedor escolar. Realizamos una entrevista abierta en donde exploramos los distintos casos de uso de la aplicación "Eat" la cual es la que utiliza la cantina que tiene la concesión actual en la institución educativa que atiende su hijo. En el proceso fuimos haciendo comparaciones con métodos anteriores que había utilizado Lourdes para contratar servicios de comedor escolar y resaltando tanto virtudes como defectos de la aplicación que utiliza. También realizamos comparaciónes con el método que solía emplear la cantina anterior que era mediante un chat por Whatsapp con la cantina. 

### Observaciones Positivas 

+ La aplicación es fácil de utilizar y resulta intuitiva para una persona habituada a al uso de aplicaciones para hacer transacciones.

+ En comparación al método anterior no hay tiempo de espera por respuestas.

+ En caso de que el menú propuesto por la cantina para cierto día no le guste al hijo, se pueden pedir comida a la cantina como milanesa con puré, fideos, sandwitches, ensladas o wraps; y cada opción incluye fotos demostrativas.

+ Se puede comprar la merienda a la cantina desde la aplicación y el responsable tiene que elegir que productos de le va a comprar por lo que puede controlar que comen sus hijos.

+ Es posible administrar más de un hijo y más de una institución educativa a la vez.

+ Se puede devolver compras y te reintegran el saldo entero.


### Observaciones Negativas

- Se tiene que comprar todos los días con poca anticipación ya que solo están publicados los menús de los próximos tres días y si el padre se llega a olvidar no le sirven comida al niño.

- No existe opción de contratar mensualmente.

- En la sección de "pedir" muestra todos los menús para las categorías: inicial, primaria, secundaria y funcionarios. Aunque el hijo que tenga cargado solo pertenezca a una de estas categorías.

- La aplicación en el menú se tranca, carga, vuelve al inicio del menú y vuelve a cargar las fotos frecuentemente.

- Funciona mediante sistema saldo, no tiene debito automático. Por lo que hay que estar comprando saldo para comprar productos en la aplicación.

- La aplicación no recuerda la información de la tarjeta por lo que hay que cargar manualmente la tarjeta cada vez que se necesite comprar saldo.

- La interfaz de usuario es fea y los botones no están adaptados para el tamaño de pantalla del dispositivo.
  
- Si compré el menú hace algunos días y por algún motivo el hijo no va el menú se pierde y no hay reintegro de dinero.    

## Ingeniería Inversa

A partir de la entrevista y con los datos obtenidos de la aplicación "Eat", decidimos realizar ingenieria inversa sobre esta misma aplicación. Nos pareció
que es un buen caso de estudio ya que es una aplicación de comedor escolar utilizada en nuestro país, lo cual es un muy buen ejemplo de lo que buscamos.

Se pudieron identificar estas funcionalidades de interés:
* Nuevo perfil de cafetería: Se realiza dentro de la tab "Mi cuenta", funciona ingresando un código de cafetería, luego de confirmar podemos seleccionar esa cafetería
  de esta manera cargando el menú dentro de la tab "Pedir". Incluye también una opcion de eliminar el perfil.
* Agregar comensal: También se realiza dentro de la tab "Mi cuenta", se ingresa nombre y apellido del comensal con su correspondiente clase (que carga directamente
  del perfil de cafetería), también se puede eliminar y editar.
* Balance y recargar saldo: En esta seccion, también dentro de "Mi cuenta", se recarga saldo para después ordenar la comida. Luego de clickearla se abre una ventana donde 
  seleccionamos cuanto saldo queremos cargar y nos manda a una ventana de manejo de compras donde podemos elegir si pagamos con débito o crédito. No se puede ordenar 
  comida sin tener balance mayor o igual al precio de la misma, o sea no se puede pedir comida con una carga automática. Esto último nos parece que se puede implementar y
  será un objetivo de nuestra aplicación.
* Tab "Pedir": Dentro de esta tab podemos ver en forma de lista o cascada todos los artículos del menú desde golosinas y meriendas hasta los menúes diarios y las comidas alternativas
  (que generalmente aparecen no diariamente sino semanalmente). Cuando queremos encargar una comida tocamos en el botón "Agregar" y aparece un pop-up con un calendario para
  seleccionar el día de entrega. Luego se presiona confirmar y si el día de entrega es válido (el menú esta disponible ese mismo dia) realiza la orden y el niño puede accederla
  el día especificado. También queda un recibo detallado dentro de la tab "Mis ordenes".
* Tab "Mis ordenes": Se divide en dos secciones; ordenes pendientes y ordenes completadas. Las ordenes pendientes son las ordenes que todavía no reclamo el comensal, e 
  incluyen un botón "Cancelar" que devuelve el dinero al balance si presionado (Creemos que esta función no colisionaría con nuestra idea de hacer la compra directa sin
  saldo cargado, ya que en el caso de que la devuelva ahí si vuelve directo al saldo en vez de tener que hacer un reembolso a la tarjeta o cuenta bancaria) .
  Las ordenes completadas muestran el historial de ordenes ya entregadas. Cada orden muestra detalladamente un recibo que incluye cuales fueron los artículos pedidos y 
  cual fue el precio de los mismos.

## Brain Storming
* La aplicación debe de contar con tres secciones principales las cuales se les debe poder acceder a todo momento desde una barra de navegación. Las secciones deben ser: Usuario, Menú y Ordenes.
* Dentro de la sección Usuario. El usuario debe poder configurar y modificar la información de pago, administrar las instituciones educativas y dentro de cada institución debe de poder administrar los comensales.
* La seccion Menú tiene q estar dividida en 3 subsecciones: Almuerzo, Merienda y Contrataciones .
* En la sección Almuerzo, la cual es la principal y la que tiene que ser mostrada al ingresar en la sección Menú, el usuario debe de poder visualizar claramente el menú del día y poder acceder a los de los próximos días fácilmente si lo desea. También debe de poder ver el listado de posibles opciones en caso de que no esté de acuerdo con el menú.
* Luego en la sección Merienda se debe poder ver un listado de posibles meriendas.
* La sección Ordenes debe de estar dividida en dos; la sección ordenes pendientes y la sección ordenes realizadas.
* Se debe de poder cancelar ordenes pendientes.
* El sistema de pago se centraliza en un balance del cual se puede cargar direcatmente un monto deseado para realizar compras o la opcion de debito automatico.
* La aplicación debe de contar con un sistema para contratar el menú para un tiempo estipulado y debe notificar al usuario cuando este tiempo se esté terminando.
## Caracterización de usuarios

![Usuario Jose](/UserJose.png)
![Usuario Maria](/UserMaria.png)
![Usuario Daniela](/UserDaniela.png)

## Modelo conceptual
![Modelo conceptual](/ModeloConceptual.png)

# Especificación

## Requerimientos Funcionales

### RF1: Inicio de sesión/ Registro
**Actor:** Usuario.

**Descripción:** El usuario podría iniciar sesión en el caso de ya tener una cuenta registrada o poder registrar una nueva cuenta.

**Prioridad:** Alta.


### RF2: Ingresar método de pago
**Actor:** Usuario.

**Descripción:** El usuario tiene que poder ingresar un método de pago y la aplicación debe preguntar si se quiere que se recuerden estos datos.

**Prioridad:** Alta.

### RF3: Registro/Modificación de comensales
**Actor:** Usuario.

**Descripción:** La aplicación debe poder permitir al usuario registrar y administrar más de un comensal.

**Prioridad:** Alta.

### RF4: Registro de cantina
**Actor:** Administrador.

**Descripción:** El sistema debe permitir a un administrador ingresar nuevas cantinas o administrarlas.

**Prioridad:** Alta.


### RF5: Publicación de Menú
**Actor:** Cantina.

**Descripción:** La aplicación debe permitirle a la cantina publicar y modificar el menú diario y las opciones. También debe poder publicar y modificar las meriendas

**Prioridad:** Alta.


### RF6: Contratación de Menú
**Actor:** Usuario.

**Descripción:** El usuario debe ser capaz de contratar el menú para más de un día y seleccionar para que comensal.

**Prioridad:** Media.


### RF7: Compra de Menú/ Meriendas
**Actor:** Usuario.

**Descripción:** La aplicación le debe de dejar al usuario comprar el menú y seleccionar a que comensal es dirigida la compra, debe de contar con un sistema de carrito donde se pueda eliminar posibles compras del carrito.

**Prioridad:** Alta.


### RF8: Administrar ordenes pendientes
**Actor:** Usuario.

**Descripción:** Se debe de poder visualizar las ordenes pendientes y se deben de poder cancelar devolviendo el dinero.

**Prioridad:** Alta.


### RF9: Registro de ordenes anteriores
**Actor:** Usuario.

**Descripción:** Tiene que haber una lista donde se muestren todas las compras anteriores.

**Prioridad:** Baja.

### RF10: Cerrar sesión
**Actor:** Usuario.

**Descripción:** El usuario debe de poder cerrar sesión.

**Prioridad:** Baja.

## Requerimientos No Funcionales

### RNF1: Compatibilidad Móvil

**Descripción:** La aplicación deberá funcionar tanto en dispositivos IOS como en Andrioid

**Prioridad:** Alta.

### RNF2: Versión Web

**Descripción:** Tiene que haber una versión web.

**Prioridad:** Alta.

### RNF3: Persistencia

**Descripción:** El sistema debe recordar la información de la sesión en el dispositivo que se esté utilizando.

**Prioridad:** Media.

## User Stories

### ID: #1
**Título:** Registro de Cantina.
<br>

**Narrativa:** Como Administrador tengo que poder registrar una nueva Cantina con sus credenciales para que esta pueda agregar sus productos al menú.
<br>

**Criterios de aceptación:** 
* Nombre de la cantina.
* Contraseña segura (8 caracteres, uno de ellos tiene que ser un número).
* Debe de ser una empresa habilitada para cocinar en escuelas (presentar numero de carnet).

### ID: #2
**Título:** Registro de Menú.
<br>

**Narrativa:** Como Cantina quiero poder registrar una nueva comida con su imagen, precio y descripción, e indicar que días esta disponible.
<br>

**Criterios de aceptación:**
* Imagen en formato jpg.
* Precio en pesos uruguayos
* Descripción no mayor de 150 caracteres.

### ID: #3
**Título:** Edición de Menú.
<br>

**Narrativa:** Como Cantina quiero poder editar los menúes creados; poder sacarlos, cambiar la imagen, descripción y días de disponibilidad.
<br>

**Criterios de aceptación:**
* Imagen en formato jpg.
* Precio en pesos uruguayos
* Descripción no mayor de 150 caracteres.

### ID: #4
**Título:** Registro de usuario.
<br>

**Narrativa:** Como usuario debo de poder registrarme.
<br>

**Criterios de aceptación:**
* Institución Estudiantil.
* Email de padre, madre o tutor de un estudiante.
* Contraseña segura (8 caracteres, uno de ellos tiene que ser un número).

### ID: #5
**Título:** Registro de comensal.
<br>

**Narrativa:** Como usuario debo de poder registrar un comensal.
<br>

**Criterios de aceptación:**
* Nombre.
* Edad.
* Numero de estudiante.
* Año escolar.

### ID: #6
**Título:** Registro de tarjeta.
<br>

**Narrativa:** Como usuario quiero agregar un método de pago para realizar órdenes.
<br>

**Criterios de aceptación:**
* Tarjeta de crédito o débito.
* Numero y csv válido.
* Fecha de vencimiento mayor a la fecha actual.

### ID: #7
**Título:** Orden de menú.
<br>

**Narrativa:** Como usuario quiero pedir un menú para un comensal.
<br>

**Criterios de aceptación:**
* Saldo mayor o igual al precio del menú o tarjeta válida para débito automático.
* Menú válido para el año escolar del comensal.

### ID: #8
**Título:** Contrato de servició de menú por tiempo estipulado.
<br>

**Narrativa:** Como usuario quiero dejar una reserva para que un comensal
<br>

**Criterios de aceptación:**
* Saldo mayor o igual al precio del menú o tarjeta válida para débito automático.

### ID: #9
**Título:** Cancelación de ordén.
<br>

**Narrativa:** Como usuario quiero cancelar una orden.
<br>

**Criterios de aceptación:**
* Orden debe de ser pendiente.

### ID: #10
**Título:** Vista de recibos de ordenes.
<br>

**Narrativa:** Como usuario quiero ver mis ordenes completadas.
<br>

**Criterios de aceptación:** 
* Solo apareceran ordenes pedidas, si el usuario nunca ordenó nada no verá nada en esta sección.

# Casos de Uso

## UC1:
**Título:** Registro de usuario.
**Referencia a RF:** 1
**Curso:**
1. Usuario abre la app.
2. Sistema muestra un formulario para registrarse. También muestra opcion de iniciar sesión.
3. Usuario completa el formulario y confirma.
4. Sistema registra el usuario y muestra un mensaje de confirmación.

## UC2:
**Título:** Inicio de sesión de usuario.
**Referencia a RF:** 1
**Curso:**
1. Usuario abre la app.
2. Sistema muestra un formulario para registrarse. También muestra opcion de iniciar sesión.
3. Usuario presiona opción de iniciar sesión.
4. Sistema muestra un formulario para iniciar sesión.
5. Usuario completa el formulario y confirma.
6. Sistema inicia sesión al usuario y muestra la aplicación principal.

## UC3:
**Título:** Ingreso de comensal.
**Referencia a RF:** 3
**Curso:**
1. Usuario presiona el ícono de perfil.
2. Sistema muestra el apartado de perfil.
3. Usuario presiona comensales.
4. Sistema muestra una ventana para registrar comensal.
5. Usuario presiona registrar nuevo comensal
6. Sistema muestra un formulario para agregar un nuevo comensal.
7. Usuario llena el formulario.
8. Sistema registra el nuevo comensal y muestra un mensaje de confirmación.
   
## UC4:
**Título:** Modificación de comensal.
**Referencia a RF:** 3
**Curso:**
1. Usuario presiona el ícono de perfil.
2. Sistema muestra el apartado de perfil.
3. Usuario presiona comensales.
4. Sistema muestra una ventana para registrar comensal.
5. Usuario presiona un comensal.
6. Sistema muestra una ventana con los detalles del comensal y una opcion para editar.
7. Usuario presiona la opcion para editar el comensal.
8. Sistema muestra un formulario ya lleno con los datos previos del comensal.
9. Usuario modifica el formulario.
10. Sistema modifica el comensal y muestra un mensaje de confirmación.

## UC5:
**Título:** Ingreso de método de pago.
**Referencia a RF:** 2
**Curso:**
1. Usuario presiona el ícono de perfil.
2. Sistema muestra el apartado de perfil.
3. Usuario presiona saldo.
4. Sistema muestra una ventana para cargar saldo.
5. Usuario presiona agregar método de pago.
6. Sistema muestra un formulario para agregar una tarjeta con la opción de que se recuerde.
7. Usuario llena el formulario.
8. Sistema registra el método de pago y muestra un mensaje de confirmación.

## UC6:
**Título:** Compra de menú, merienda o contratación de menú.
**Referencia a RF:** 7, 6
**Curso:**
1. Usuario presiona el ícono de menú.
2. Sistema muestra el apartado de menú.
3. Usuario presiona un menú que le gusta.
4. Sistema muestra una ventana con la descripción del menú.
5. Usuario presiona agregar al carrito.
6. Sistema muestra una confirmación de que el producto se agregó al menú.
7. Usuario presiona el ícono de carrito.
8. Sistema muestra una ventana con los artículos añadidos al carrito.
9. Usuario presiona comprar para tal comensal.
10. Sistema muestra una ventana de confirmación de compra.
11. Usuario confirma la compra.
12. Sistema realiza la compra, manda la orden a la sección de órdenes pendientes, descuenta el saldo del precio de la compra.

## UC7:
**Título:** Cancelar orden.
**Referencia a RF:** 8
**Curso:**
1. Usuario presiona el ícono de ordenes.
2. Sistema muestra el apartado de ordenes.
3. Usuario presiona una orden específica.
4. Sistema muestra una ventana con los datos de la orden y la opción de cancelarla.
5. Usuario presiona cancelar orden.
6. Sistema muestra una ventana de verificación.
7. Usuario verifica.
8. Sistema muestra un mensaje de confirmación, cancela la orden y reembolsa el precio de la misma al saldo.

## UC7:
**Título:** Ver órdenes anteriores.
**Referencia a RF:** 9
**Curso:**
1. Usuario presiona el ícono de ordenes.
2. Sistema muestra el apartado de ordenes.
3. Usuario presiona órdenes anteriores.
4. Sistema muestra una lista con todas las órdenes anteriores.
5. Usuario presiona una órden en particular.
6. Sistema muestra los detalles de esa orden.

## UC8:
**Título:** Cerrar sesión.
**Referencia a RF:** 10
**Curso:**
1. Usuario presiona el ícono de perfil.
2. Sistema muestra el apartado de perfil.
3. Usuario presiona la opción de cerrar sesión.
4. Sistema muestra una ventana de confirmación.
5. Usuario verifica.
6. Sistema cierra sesión y muestra la pantalla de inicio (la misma que cuando se abre por primera vez la app).

# Bocetos UI

## Registrarse:
![registrarse](/registrarse.png)

## Iniciar sesion:
![iniciar](/iniciar.png)

## Vista del menú:
![menu](/menu.png)

## Vista de órdenes:
![ordenes](/ordenes.png)

# Validación
## Validar la especificación
| Requerimiento | RF1 | RF2 | RF3 | RF4 | RF5 | RF6 | RF7 | RF8 | RF9 | RNF1 | RNF2 | RNF3 |
|---------------|-----|-----|-----|-----|-----|-----|-----|-----|-----|------|------|------|
|     Viable    | Si  | Si  | Si  | Si  | Si  | Si  | Si  | Si  | Si  | Si   | Si   | Si   |  
|  Consistente  | Si  | Si  | Si  | Si  | Si  | Si  | Si  | Si  | Si  | Si   | Si   | Si   | 
|    Preciso    | Si  | Si  | Si  | Si  | Si  | Si  | Si  | Si  | Si  | Si   | Si   | Si   |  
|  Verificable  | Si  | Si  | Si  | Si  | Si  | Si  | Si  | Si  | Si  | Si   | Si   | Si   | 
|Usuarios identificados| Si  | Si  | Si  | Si  | Si  | Si  | Si  | Si  | Si  | NA   | NA   | NA   | 


## Validar la solución con personas no involucradas con en proyecto
Conversamos nuevamente con Lourdes Segura y le mostramos todos los requerimientos y mejoras que tendrá nuestra aplicación. En cuanto a esto nos dijo que una aplicación con estas características va a ser mucho mas sencilla de utilizar que la que usa actualmente y más clara. En cuanto a la interfaz mencionó que los colores elegidos se alineaban mas con el proposito de la aplicación y que todos los botones y menues se ven "más pulidos" que la que utiliza.

# Reflexión
En nuestra opinión este obligatorio fue muy nutritivo ya que pudimos experimentar por mano propia la importancia deñ proceso de  ingeniería de requerimientos en un problema real el cual será llevado a la realidad. Nos vimos forzados a aplicar conocimientos y técnicas aprendidas en clase. En cuanto a la entrevista no tuvimos problemas por disponibilidad ya que el usuario es el familiar de Tomás. Gracias a este proyecto aprendimos a la fuerza a utilizar github para realizar un proyecto donde hay más de un involucrado y esta es una gran herramienta para nuestro futuro como desarrolladores de software. En general creemos que fue un trabajo satisfactorio que nos dejará aprendizajes muy valiosos para nuestra futura vida laboral.

# Evidencia de investigación 
## Entrevista
### Muestra de app de referencia
https://youtu.be/MnRR9FV5pyI
### Entrevista a Lourdes
https://youtu.be/HBVxEwnEBLo

