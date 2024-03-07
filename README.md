<h1>
    Introducción 
</h1>
<p>
    Bienvenid@s a este repositorio donde conseguirás información sobre el proyecto de 
    "Sistema de reporte de cuotas via correo electrónico". Antes de iniciar, debemos de tomar en cuenta
    que hay que tener ciertos elementos en consideración antes de iniciar. 
    <br><br>
    Este proyecto esta totalmente basado en tecnología web. este usa Node.js y Electron.js para su back-end,
    y tecnologías estándar de la web junto con frameworks como React.js para cumplir la problemática que el 
    proyecto busca realizar. Sin mas que decir empecemos.
</p>

<h1>
    Instalación
</h1>


<h2>
    Pre-requisitos:
</h2>
<p>
    es necesario saber que para poder instalar este sistema requiere de una serie de requisitos que el desarrollador
    debe de cumplir para poder lanzar este sistema, los cuales se enumera de la siguiente manera:
    
</p>
<li>
    Tener instalado <a href="https://nodejs.org/en">NODE.JS</a> en tu equipo.
</li>
<li>
    Tener instalado <a href="https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.6-signed.msi">MongoDB</a> en tu equipo
</li>
<li>
    Configurar tu servidor de MongoDB y conocer el puerto en el que este se ejecuta.
</li>



<h2>
    Instalación del sistema
</h2>
<p>
    Una vez teniendo todos los requisitos recopilados, ya podemos empezar con la instalación del sistema. asegúrese
    de que su equipo actualice las direcciones PATH de su sistema en tiempo real, en el caso de que no puede que tenga
    que reiniciar el equipo.
</p>
<p>
    Ya una vez teniendo en cuenta todo esto, este son los pasos para la instalación:

    
</p>
<li>
    Debes abrir la linea de comandos y dirigirte a la carpeta del proyecto
</li>
<li>
    Debes ejecutar la instalación de las dependencias del proyecto. para esto debes de colocar el comando:
    (el proceso puede tomar entre minutos a horas, dependiendo de tu equipo y la velocidad de tu internet).

    npm run install
    
</li>
<li>
    Una vez instalado las dependencias para poder arrancar el sistema debes de tomar en cuenta que la base de 
    datos en mongoDB debe de estar ejecutándose, este lo podrás observar en el administrador de tareas. En el caso de
    que no lo hayas instalado como servicio debes de ejecutarlo manualmente:
    (Este solo funciona en windows, tendrá sus variantes para otros sistemas)

    "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\7.0\bin\mongod.cfg"

</li>
<li>
    (Opcional) Instala <a href="https://downloads.mongodb.com/compass/mongosh-2.1.5-x64.msi">MongoDB Compass</a> para asi poder gestionar tu base de datos mas fácilmente
</li>
<li>
    debes de configurar el servidor del proyecto para poder ser ejecutado, en la carpeta raíz del proyecto tienes
    un archivo ".env.format" solo quita el ".format" y debería de quedar ".env" dentro del archivo debería haber una sola
    variable "DBURI" esta es la dirección de la base de datos de mongoDB. si recién lo instalas déjalo tal cual.
</li>




<h1>
    Ejecutar el sistema
</h1>
<p>
    si hasta ahora haz hecho todo bien, al momento de ejecutar el sistema no debería de lanzarte ninguna bandera roja
    pues, para poder ejecutarlo debes de seguir los siguientes pasos:

</p>
<li>
    Debes abrir la linea de comandos y dirigirte a la carpeta del proyecto
</li>
<li>
    Antes de iniciar el sistema debes de ejecutar el servidor del sistema.
    Esto debería de abrir el servidor del sistema y para asegurarse que todo esta bien este dirá: "server open in the port: [PUERTO]".

    npm run server
    
</li>
<li>
    Una vez ejecutado el servidor del sistema solo faltaría ejecutar la aplicación cliente, la cual se ejecuta escribiendo:

    npm run dev
</li>




<h1>
    Final
</h1>
<p>
    Si haz realizado todos los pasos bien este debería ejecutarse y poder conectarse al servidor sin problemas. la contraseña y usuario 
    del root del servidor por defecto siempre es: "admin" pero si quieres luego puedes cambiárselo en sus configuraciones
</p>