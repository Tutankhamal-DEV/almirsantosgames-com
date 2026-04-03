const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');
const files = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json'));

const ptTexts = {
  text1a: "Salve galera, para quem não me conhece, me chamo Almir, para quem me conhece, também me chamo Almir kkkk, Sou Fortalezense, e por isso sempre busco manter o bom humor, que é uma característica nossa.",
  text1b: "Sou apaixonado por games desde os 6 anos de idade, quando joguei Super Mario Bros em um Dynavison 3 na casa do meu primo, e desde então, seguimos jogando até os dias atuais.",
  text2a: "Um fato curioso da minha história é o fato de que, na casa de minha avó, tinha uma locadora, e isso fez com que eu me envolvesse ainda mais essa paixão pelos games, seja jogando, seja cuidando da locadora, para que a mesma pudesse evoluir ainda mais.",
  text2b: "Ainda na infância, comecei a frequentar a feira da Parangaba aqui em Fortaleza (também conhecida como feira dos pássaros), sempre em busca de novos jogos, seja trocando ou comprando, e também em busca de consoles e acessórios, rotina que tive religiosamente aos domingos pela manhã durante boa parte da minha vida.",
  text3a: "Após o fechamento da locadora da minha avó, cheguei a montar uma Lan House, com alguns PCs e uma locadora, em casa mesmo, e foi uma experiência incrível receber todo mundo, não só como cliente, mas como amigos que, alguns, mantenho contato até os dias atuais, não só na minha locadora, como na locadora da casa de minha avó.",
  text3b: "Com o surgimento de conteúdos sobre games, em 2018, comecei a participar e fazer lives com meu amigo Pedrão, no canal dele, o \"Projeto 39\", e soube ali mesmo que queria fazer isso por muito tempo, pois, sempre jogava conversando com a galera, sempre tinha alguém do meu lado na locadora conversando comigo enquanto eu jogava, e percebi que fazendo as lives, era a forma que tinha encontrado de jogar, conversar com a galera e ainda fazer novos amigos.",
  text4a: "Um ano depois, de forma improvisada, pois sequer eu tinha Pc decente pra rodar o OBS de forma decente, comecei a fazer lives no meu canal pessoal, o Almir Jovi, mas como lá tinham alguns vídeos relacionados a música, percebi que tinha que criar um canal apenas de games.",
  text4b: "Foi aí que em 10 de abril de 2020, criei o canal Almir Santos, que curiosamente, teria outro nome, mas acabou que não utilizei o nome em questão, que seria, \"Gameplay com Rapadura\", partindo daí, seguimos trazendo alegria, resenha, sempre muita gameplay e o principal, fazendo amigos para vida, pois os games unem as pessoas, a através disso, quero sempre estar cercado das melhores pessoas que Deus colocar em meu caminho através do canal, e encontrando muitas dessas pessoas, seja nos eventos, seja fora deles!",
  text5a: "Aproveite bem o site que meu amigo Tutankhamal desenvolveu com muito carinho e como sempre falo, \"Sem perder tempo, vamos começar essa bagaça!\""
};

const enTexts = {
  text1a: "Hey guys, for those who don't know me, my name is Almir. For those who do, my name is also Almir hahaha! I'm from Fortaleza, and because of that, I always try to keep a good sense of humor, which is our trademark.",
  text1b: "I've been passionate about games since I was 6 years old, when I played Super Mario Bros on a Dynavision 3 at my cousin's house. Since then, we've kept playing to this day.",
  text2a: "A curious fact about my history is that my grandmother had a video game rental store in her house. This made me even more involved in my passion for games, whether I was playing or taking care of the store so it could grow.",
  text2b: "Still in my childhood, I started going to the Parangaba fair here in Fortaleza (also known as the birds fair), always looking for new games, trading or buying them, and also looking for consoles and accessories. I did this religiously on Sunday mornings for a good part of my life.",
  text3a: "After my grandmother's rental store closed, I even set up a Lan House with some PCs and a rental area right in my house. It was an incredible experience to welcome everyone, not just as customers, but as friends—some of whom I still keep in touch with today.",
  text3b: "When gaming content started to boom around 2018, I began participating and doing lives with my friend Pedrão on his channel, 'Projeto 39'. I knew right then I wanted to do this for a long time. I realized streaming was the way to play, chat with people, and make new friends simultaneously.",
  text4a: "A year later, improvising completely since I didn't even have a decent PC to run OBS, I started streaming on my personal channel, Almir Jovi. But since I had music videos there, I realized I needed a dedicated gaming channel.",
  text4b: "That's when, on April 10, 2020, I created the Almir Santos channel. Curiously, it was supposed to have another name: 'Gameplay com Rapadura'. From there on, we kept bringing joy, good chats, a lot of gameplay, and most importantly, making friends for life!",
  text5a: "Enjoy this website that my friend Tutankhamal developed with so much affection. And as I always say, 'Without wasting any time, let's get this going!'"
};

const esTexts = {
  text1a: "Hola chicos, para los que no me conocen, me llamo Almir. ¡Para los que ya me conocen, también me llamo Almir jajaja! Soy de Fortaleza, y por eso siempre trato de mantener el buen humor, que es nuestra marca registrada.",
  text1b: "Soy un apasionado de los videojuegos desde los 6 años, cuando jugaba Super Mario Bros en un Dynavision 3 en casa de mi primo. Desde entonces, hemos seguido jugando hasta el día de hoy.",
  text2a: "Un hecho curioso de mi historia es que en casa de mi abuela había una tienda de alquiler de videojuegos. Esto me involucró aún más en mi pasión por los juegos, ya fuera jugando o cuidando la tienda para que creciera.",
  text2b: "Aún en mi infancia, empecé a ir a la feria de Parangaba aquí en Fortaleza, siempre en busca de nuevos juegos, cambiándolos o comprándolos, y también buscando consolas y accesorios. Hacía esto religiosamente los domingos por la mañana durante buena parte de mi vida.",
  text3a: "Después de que la tienda de mi abuela cerrara, incluso monté un cibercafé con algunos PCs y un área de alquiler en mi propia casa. Fue una experiencia increíble recibir a todos, no solo como clientes, sino como amigos.",
  text3b: "Con el auge de la creación de contenido en 2018, comencé a participar y hacer directos con mi amigo Pedrão en su canal, 'Projeto 39'. Supe allí mismo que quería hacer esto por mucho tiempo. Me di cuenta de que hacer streams era la forma de jugar, charlar con la gente y hacer nuevos amigos a la vez.",
  text4a: "Un año después, improvisando porque ni siquiera tenía un PC decente para ejecutar OBS, comencé a hacer directos en mi canal personal, Almir Jovi. Pero como allí tenía videos musicales, me di cuenta de que necesitaba un canal exclusivo para juegos.",
  text4b: "Fue entonces cuando, el 10 de abril de 2020, creé el canal Almir Santos. Curiosamente, iba a tener otro nombre: 'Gameplay com Rapadura'. A partir de ahí, seguimos trayendo alegría, buenas charlas, muchas partidas y, lo más importante, ¡haciendo amigos para toda la vida!",
  text5a: "Disfruten de esta web que mi amigo Tutankhamal ha desarrollado con mucho cariño. Y como siempre digo: 'Sin perder el tiempo, ¡vamos a empezar esta locura!'"
};

files.forEach(file => {
  const content = JSON.parse(fs.readFileSync(path.join(messagesDir, file), 'utf8'));
  const lang = file.replace('.json', '');
  
  const isPt = lang === 'pt';
  const isEs = lang === 'es';
  
  // Navbar localization
  if (!content.Navbar) content.Navbar = {};
  content.Navbar.about = isPt ? "Sobre" : (isEs ? "Sobre Mí" : "About");
  
  // About Section localization
  content.About = {
    title: isPt ? "SOBRE MIM" : (isEs ? "SOBRE MÍ" : "ABOUT ME"),
    ...(isPt ? ptTexts : (isEs ? esTexts : enTexts))
  };
  
  fs.writeFileSync(path.join(messagesDir, file), JSON.stringify(content, null, 4));
});

console.log("Patched all 15 translation files with About keys.");
