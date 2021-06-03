
export const dungeon = {
    methods: {
        generateDungeon(type, count) {
            var map = [];
            // gold, wood, chest, equip
            var types = ['gold', 'crystal','chest', 'equip']
            var img = ['gold', 'crystal', 'chest', 'equip']
            var probability = [0.2, 0.4, 0.6, 1];
            for(var i=0; i<count; i++) {
                let temp = []
                for(var j=0; j<3; j++) {
                    let choice = {};
                    let random = Math.random();
                    for(var k=0; k<probability.length; k++) {
                        if(random <= probability[k]) {
                            choice = {type: types[k], img: './icons/'+img[k]+'.png'};
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