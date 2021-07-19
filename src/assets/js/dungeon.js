
export const dungeon = {
    methods: {
        generateDungeon(type, count, level) {
            var map = [];
            // gold, wood, chest, equip
            var types = {
                gold : 50, 
                equip : 50, 
                crystal : 10, 
                chest : 3, 
            }
            var option = ['gold', 'equip'];
            var probability = [];
            if(level >= 20) 
                option.push('crystal');
            if(level >= 40) 
                option.push('chest');
            var total = 0;
            for(var type in option) {
                total += types[option[type]];
                probability.push(total);
            }
            for(var i=0; i<count; i++) {
                let choice = {};
                let random = Math.random()*total;
                for(var k=0; k<probability.length; k++) {
                    if(random <= probability[k]) {
                        choice = {
                            type: 'normal', 
                            reward: option[k], 
                            img: './icons/'+option[k]+'.png',
                            lv: 1,
                            templateId: 0,
                            count: -1,
                            left: Math.random()*90,
                            top: Math.random()*90,
                        };
                        break;
                    }
                }
                map.push(choice);
            }
            return map;
        }
    }
}