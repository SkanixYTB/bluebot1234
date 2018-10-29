const Discord = require('discord.js');

var bot = new Discord.Client();
var Prefix = "/";


bot.on("ready" , () => {
  bot.user.setPresence({ game: {name: "[/help] FuniBot"}})
    console.log("Bot Ready");
});


bot.on("guildMemberAdd" , member =>{
  let role = member.guild.roles.find("name", "Bluetoyen");
  member.guild.channels.find("name", "bienvenu").send(`Salut ___**${member.user.username}**___,bienvenue sur le serveur ★------{ƑUƝƤǀXƐM Ʋ.1}------★ :tada::hugging: ! J’espère que tu y resteras et que tu seras un bon joueur :radioactive:️:computer::radioactive:️`);
  member.addRole(role)
})
bot.on("guildMemberRemove" , member =>{
  member.guild.channels.find("name", "bienvenu").send(`___**${member.user.username}**___ au revoir ,c’était sympa de nous rendre une petite visite :cold_sweat: !`);
})

bot.on('message' , msg => {
//ping-pong
    if(msg.content === Prefix + "ping"){
        msg.reply("pong");
        console.log("ping")
    }   
//yt
    if(msg.content === Prefix + "yt"){
        msg.reply("Voila : https://www.youtube.com/channel/UCNr-CJSIA-grhveS48FX4rA , Abonne-Toi et met la cloche pour ressevoir les notifications :wink: ")
    }
//clear
    if(msg.content.startsWith(Prefix + "clear")){
      //if(msg.guild.member(msg.author).hasPermission("MANAGE_MESSAGES")) return msg.channel.send("Vous n'avez pas la permission");
        
        let args = msg.content.split(" ").slice(1);

        if(!args[0]) return msg.channel.send("Tu doit indiquer le nombre de message a surpimer !")
        msg.channel.bulkDelete(args[0]).then(() => {
                msg.channel.send(`Les ${args[0]} ont bien été surpimer :grinning:`);
                console.log("clear " + args[0])  
            })
    }
//help embed
    if(msg.content === Prefix + "help"){
        const help_embed = new Discord.RichEmbed()
      .setTitle('Commandes De Funibot :')
      .setColor("#E2A324  ")
      .setDescription("Je suis un Bot Discord a t'a disposision")
      .addField("-/help : Donne les informations des commande du Bot")
      .addField("-/yt : Donne la chaine du serveur")
      .addField("-/stats : Donne tes statistique")
      .addField("-/8ball <question> : Permet de jouer avec le Bot en lui posant des questions ")
      .addField("-/infoserver : donnent les info sur le serveur")
      .addField("-/clear : surprime les messages que tu veux en allant plus vite (:no_entry: Reserver au Admin  :no_entry:)")
      .addField("-/helpwarn : Donne toutes les commandes du warn (:no_entry: Reserver au Admin  :no_entry:)")
      .setFooter("Bot dev par Skanix (si tu souhaite rajouter une commande fait le moi savoir)")

    msg.channel.sendEmbed(help_embed);
    console.log("help embed")
}
//help warn
    if(msg.content === Prefix + "helpwarn"){
        const help_embed = new Discord.RichEmbed()
      .setTitle('Commandes Du /warn :')
      .setDescription("(:no_entry: Reserver au Admin  :no_entry:)")
      .setColor(0xFF0000)
      .addField("-/warn <@player> <Raison>  : cree un warn au joueur citer")
      .addField("-/seewarns <@player> : Permet de voir tout les warns d'un joueur")
      .addField("/delewarn <raison(ex = 1....)> : Permet de suprimer les warns")

    msg.channel.sendEmbed(help_embed);
    console.log("help warn")
      }
//stats
    if(!msg.content.startsWith(Prefix))  return;

    var args = msg.content.substring(Prefix.length).split(" ");

    switch (args[0].toLowerCase()){
        case "stats":

        var userCreateDate = msg.author.createdAt.toString().split(" ");
        var msgauthor = msg.author.id;
        var stats_embed = new Discord.RichEmbed()
            .setColor("#fbaa06")
            .setTitle(`Statisique De l'utilisateur : ${msg.author.username}`)
            .addField(`ID de l'utilisateur :id: `, msgauthor , true)
            .addField(`Date de creation de l'utilisateur : ` , userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
            .setThumbnail(msg.author.avatarURL)
        msg.channel.sendEmbed(stats_embed);
        break;
//8Ball       
        case "8ball":
        let args = msg.content.split(" ").slice(1);
        let tte = args.join(" ")
        if(!tte){
          return msg.reply("Merci de poser tz question :8ball:")};;
        var replys = [
          "Oui",
          "Non",
          "Je sais pas",
          "Peut-Etre"
        ];

        let reponse = (replys[Math.floor(Math.random() * replys.length)])
        var bembemd = new Discord.RichEmbed()
        .setColor("#0F006F")
        .setDescription(":8ball: 8Ball")
        .addField("Question", tte)
        .addField("Reponse", reponse)
        msg.channel.send(bembemd)
      }
        
//mute
   if(msg.content.startsWith(Prefix + "mute")) {
    if(!msg.guild.member(msg.author).hasPermission("ADMINISTRATOR")) return msg.channel.send("Vous n'avez pas la permission !");

    if(msg.mentions.users.size === 0) {
        return msg.channel.send('Vous devez mentionner un utilisateur !');
    }

    var mute = msg.guild.member(msg.mentions.users.first());
    if(!mute) {
        return msg.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
    }

    if(!msg.guild.member(bot.user).hasPermission("ADMINISTRATOR")) return msg.channel.send("Je n'ai pas la permission !");
    msg.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
        msg.channel.send(`${mute.user.username} est mute dans ce channel!`);
    })
}
//unmute
if(msg.content.startsWith(Prefix + "unmute")) {
    if(!msg.guild.member(msg.author).hasPermission("ADMINISTRATOR")) return msg.channel.send("Vous n'avez pas la permission !");

    if(msg.mentions.users.size === 0) {
        return msg.channel.send('Vous devez mentionner un utilisateur !');
    }

    var mute = msg.guild.member(msg.mentions.users.first());
    if(!mute) {
        return msg.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
    }

    if(!msg.guild.member(bot.user).hasPermission("ADMINISTRATOR")) return msg.channel.send("Je n'ai pas la permission !");
    msg.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
        msg.channel.send(`${mute.user.username} n'est plus mute !`);
    })
}
//Warn
 
var fs = require('fs');
 
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
 
if (msg.content.startsWith(Prefix + "warn")){
 
if (msg.channel.type === "dm") return;
 
var mentionned = msg.mentions.users.first();
 
if(!msg.guild.member(msg.author).hasPermission("MANAGE_GUILD")) return msg.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
if(msg.mentions.users.size === 0) {
 
  return msg.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
 
}else{
 
    const args = msg.content.split(' ').slice(1);
 
    const mentioned = msg.mentions.users.first();
 
    if (msg.member.hasPermission('MANAGE_GUILD')){
 
      if (msg.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[msg.guild.id] === undefined)
 
              warns[msg.guild.id] = {};
 
            if (warns[msg.guild.id][mentioned.id] === undefined)
 
              warns[msg.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[msg.guild.id][mentioned.id]).length;
 
            if (warns[msg.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[msg.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: msg.author.id};
 
            } else {
 
              warns[msg.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: msg.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            msg.delete();
 
            msg.channel.send(':warning: | **'+mentionned.tag+' à été averti**');
 
            msg.mentions.users.first().send(`:warning: **Warn |** depuis **${msg.guild.name}** donné par **${msg.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
 
          } else {
 
            msg.channel.send("Erreur mauvais usage: "+Prefix+"warn <user> <raison>");
 
          }
 
        } else {
 
          msg.channel.send("Erreur mauvais usage: "+Prefix+"warn <user> <raison>");
 
        }
 
      } else {
 
        msg.channel.send("Erreur mauvais usage: "+Prefix+"warn <user> <raison>");
 
      }
 
    } else {
 
      msg.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
}
 
 
 
  if (msg.content.startsWith(Prefix+"seewarns")||msg.content===Prefix+"seewarns") {
 
if (msg.channel.type === "dm") return;
 
if(!msg.guild.member(msg.author).hasPermission("MANAGE_GUILD")) return msg.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
    const mentioned = msg.mentions.users.first();
 
    const args = msg.content.split(' ').slice(1);
 
    if (msg.member.hasPermission('MANAGE_GUILD')){
 
      if (msg.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[msg.guild.id][mentioned.id] === undefined||Object.keys(warns[msg.guild.id][mentioned.id]).length === 0) {
 
              msg.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
              return;
 
            }
 
          } catch (err) {
 
            msg.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[msg.guild.id][mentioned.id]).length+"** warns :eyes:");
 
          for (var warn in warns[msg.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[msg.guild.id][mentioned.id][warn].raison+
 
            "**\" warn donné par **"+msg.guild.members.find("id", warns[msg.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[msg.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          msg.channel.send(arr.join('\n'));
 
        } else {
 
          msg.channel.send("Erreur mauvais usage: "+Prefix+"seewarns <user> <raison>");
 
          console.log(args);
 
        }
 
      } else {
 
        msg.channel.send("Erreur mauvais usage: "+Prefix+"seewarns <user> <raison>");
 
      }
 
    } else {
 
      msg.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
 /////  
 
 
 
  if (msg.content.startsWith(Prefix+"deletewarns")||msg.content===Prefix+"deletewarns") {
 
if (msg.channel.type === "dm") return;
 
if(!msg.guild.member(msg.author).hasPermission("MANAGE_GUILD")) return msg.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
   const mentioned = msg.mentions.users.first();
 
    const args = msg.content.split(' ').slice(1);
 
    const arg2 = Number(args[1]);
 
    if (msg.member.hasPermission('MANAGE_GUILD')){
 
      if (msg.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
 
          if (!isNaN(arg2)) {
 
            if (warns[msg.guild.id][mentioned.id] === undefined) {
 
                msg.channel.send(mentioned.tag+" n'a aucun warn");
 
              return;
 
            } if (warns[msg.guild.id][mentioned.id][arg2] === undefined) {
 
                msg.channel.send("**:x: Ce warn n'existe pas**");

              return;
 
            }
 
            delete warns[msg.guild.id][mentioned.id][arg2];
 
            var i = 1;
 
            Object.keys(warns[msg.guild.id][mentioned.id]).forEach(function(key){
 
              var val=warns[msg.guild.id][mentioned.id][key];
 
              delete warns[msg.guild.id][mentioned.id][key];
 
              key = i;
 
              warns[msg.guild.id][mentioned.id][key]=val;
 
              i++;
 
            });
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            if (Object.keys(warns[msg.guild.id][mentioned.id]).length === 0) {
 
              delete warns[msg.guild.id][mentioned.id];
 
            }
 
            msg.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);
 
            return;
 
          } if (args[1] === "tout") {
 
            delete warns[msg.guild.id][mentioned.id];
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            msg.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);
 
            return;
 
          } else {
 
            msg.channel.send("Erreur mauvais usage: "+Prefix+"clearwarns <utilisateur> <nombre>");
 
          }
 
        } else {
 
          msg.channel.send("Erreur mauvais usage: "+Prefix+"clearwarns <utilisateur> <nombre>");
 
        }
 
      } else {
 
        msg.channel.send("Erreur mauvais usage: "+Prefix+"clearwarns <utilisateur> <nombre>");
 
      }
 
    } else {
 
      msg.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
//info serveur
    if(msg.content === Prefix + "infoserver")
      var embed_info = new Discord.RichEmbed()
      .setTitle("Info du serveur :")
      .addField("Nom du Discord : ", msg.guild.name)
      .addField("Crée le : ", msg.guild.createdAt)
      .addField("Tu as rejoin le : ", msg.member.joinedAt)
      .addField("Nombre de personne sur le Discord : ", msg.guild.memberCount)
      .setColor("0x0000FF")
    msg.channel.send(embed_info)
    console.log("info server");
//sondage
  if(msg.content.startsWith(Prefix + "sondage")){
    if(msg.author.id == "296585239822860288", "367349463565729793"){
      let args = msg.content.split(" ").slice(1);
      let thingToEcho = args.join(" ")
      var embeds = new Discord.RichEmbed()
        .setDescription("Sondage : ")
        .addField(thingToEcho , "Repondre avec :white_check_mark: ou :x:")
        .setColor("0xB40404")
        .setTimestamp()
      msg.guild.channels.find("name", "sondage").sendEmbed(embeds)
      .then(function (msg){
        msg.react("✅")
        msg.react("❌")
      }).catch(function(){
      });
    }else{
      return msg.reply("Tu n'a pas la permission")
    }
  }
  if (msg.content.startsWith(Prefix + 'kick')) {
    const user = msg.mentions.users.first();
    if(!msg.guild.member(msg.author).hasPermission("KICK_MEMBERS")) return msg.channel.send("Vous n'avez pas la permission !");
    if (user) {
      const member = msg.guild.member(user);
      if (member) {
        member.kick('Optional reason that will display in the audit logs').then(() => {
          msg.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          msg.reply('Je suis incapable de kick le membre');

          console.error(err);
        });
      } else {

        msg.reply("Cette utilisateur n'existe pas ou impossible a kick");
      }
    } else {
      msg.reply("Tu doit mentionner quelqu'un!");
    }
  } 
  if (msg.content.startsWith(Prefix + 'ban')) {
    const user = msg.mentions.users.first();
    if (user) {
      const member = msg.guild.member(user);
      if (member) {
        member.ban({
          reason: 'They were bad!',
        }).then(() => {
          msg.reply(`${user.tag} à bien été ban`);
        }).catch(err => {
          msg.reply('I was unable to ban the member');
          console.error(err);
        });
      } else {
        msg.reply('That user isn\'t in this guild!');
      }
    } else {
      msg.reply('You didn\'t mention the user to ban!');
    }
  }


});


bot.login("NTAzOTYyMzM5MTkyNzMzNzI3.DrSdAg.ejzmkir570m2BUUamrrsUnQv4lE");
