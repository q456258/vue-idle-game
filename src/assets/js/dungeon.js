
export const dungeon = {
    methods: {
        generateDungeon(type, count, level) {
            var map = [];
            // gold, wood, chest, equip
            var types = {
                gold : 50, 
                equip : 50, 
                crystal : 10, 
                chest : 2, 
            }
            var option = ['gold', 'equip'];
            var probability = [];
            if(level >= 10) 
                option.push('crystal');
            // if(level >= 30) 
                option.push('chest');
            var total = 0;
            for(var type in option) {
                total += types[option[type]];
                probability.push(total);
            }
            for(var i=0; i<count; i++) {
                let temp = []
                for(var j=0; j<3; j++) {
                    let choice = {};
                    let random = Math.random()*total;
                    for(var k=0; k<probability.length; k++) {
                        if(random <= probability[k]) {
                            choice = {type: option[k], img: './icons/'+option[k]+'.png'};
                            break;
                        }
                    }
                    temp.push(choice);
                }
                map.push(temp);
            }
            return map;
        }
    }
}