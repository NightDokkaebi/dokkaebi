const {Client, MessageEmbed} = require('discord.js');
const client = new Client;
const prefix = "?"
client.on('ready', () => {
  console.log(`까불지마`);
  client.user.setPresence({
      status: "online",
      activity: {
          name: "적에게 대출 문의 전화",
          type: "PLAYING"
      }
  });
});

client.on('message',msg => {
    if(msg.content === `${prefix}메이플스토리`) {
        msg.channel.send('https://namu.wiki/w/%EB%A9%94%EC%9D%B4%ED%94%8C%EC%8A%A4%ED%86%A0%EB%A6%AC#')
    }
}
);

client.on('message',msg => {
    if(msg.content === `${prefix}롤`) {
        msg.channel.send('https://namu.wiki/w/%EB%A6%AC%EA%B7%B8%20%EC%98%A4%EB%B8%8C%20%EB%A0%88%EC%A0%84%EB%93%9C')
    }
}
);

client.on('message', msg => { //채널에 메시지가 보내졌을 때
    if (msg.author.bot || !msg.content.startsWith(prefix)) return; 
            //만일 메시지 작성자가 봇이거나 메시지가 prefix(!)으로 시작하지 않는다면 client.on() 탈출
    var args = msg.content.slice(prefix.length).trim().split(' '); 
            //args 선언, "메시지 내용 중 앞에서 prefix의 길이만큼 잘라내고 양 끝 공백 없앤 뒤 띄어쓰기로 분할" 로 정의
    var cmd = args.shift(); // cmd 선언, "args에서 맨 앞에 분할된 값 잘라내서 가져옴"으로 정의
    switch (cmd.toLowerCase()) { //cmd를 모두 소문자로 바꿨을 때
        case 'purge': //purge라면
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
            var embed = new MessageEmbed()
                .setTitle('Error')
                .setColor(0xff0000)
                .setDescription('You don\'t have permission.')
            msg.channel.send(embed);
            break;
        }
    if (args.length !== 1) {
        var embed = new MessageEmbed()
            .setTitle('Error')
            .setColor(0xff0000)
            .setDescription('You have to input **exactly one** argument.')
        msg.channel.send(embed);
        break;
    }
    var purge = msg.content.substring(7);
    if (purge > 50 || purge < 1) {
        var embed = new MessageEmbed()
            .setTitle('Error')
            .setColor(0xff0000)
            .setDescription('You have to input 1~50')
        msg.channel.send(embed);
        break;
    }
    if (isNaN(purge) === true) {
        var embed = new MessageEmbed()
            .setTitle('Error')
            .setColor(0xff0000)
            .setDescription('You have to input number.')
        msg.channel.send(embed);
        break;
    }
    else {
        msg.channel.bulkDelete(parseInt(purge) + 1)
            .then(() => {
                var embed = new MessageEmbed()
                    .setTitle(`Message deleted`)
                    .setColor(0x00ff00)
                    .setDescription(`Successfully deleted ${purge} message(s).`)
                msg.channel.send(embed);
            })
            .catch(err => {
                var embed = new MessageEmbed()
                    .setTitle('Error')
                    .setColor(0xff0000)
                    .setDescription('An error occured; I was unable to delete messages.')
                msg.channel.send(embed);
                console.error(err);
            });
    }
            break;
    }
});


client.login('NzM5MzY4OTIwNTAyNTAxNDY3.XyZc9w.i-7p1VbR4-ioHeZOUpICrMfLVYA');