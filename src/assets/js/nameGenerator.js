export const nameGenerator = {
    data() {
        return {
            human: [
'亚伦','阿卜杜勒','阿卜杜拉','亚伯','阿伯拉尔','阿比洛','亚伯拉罕','亚伯兰','阿塞尔','阿基里斯','阿基里斯','阿基琉斯','阿希姆','阿赫米德','阿克利','阿克利','阿克顿','阿达拉德','阿达尔贝罗','阿达尔伯特','阿达尔布雷希特','阿达尔维因','亚当','阿丹','阿迪','阿迪森','阿迪生','阿德拉尔','阿德尔伯特','阿德尔福','亚丁','阿杰','阿德拉德','阿迪','阿迪生','阿迪亚','阿道夫','阿道夫','阿道夫','阿多奈','阿多尼娅','阿多尼斯','阿德雷','阿德里安','阿德里安','阿德里尔','阿德里安',
'阿格隆','奥古斯丁','艾哈迈德','艾哈迈德','艾丹','艾登','艾肯','艾琳','阿基姆','阿兰','艾伦','阿尔巴里克','阿尔贝罗','阿尔伯特','阿尔贝托','阿尔宾','阿尔布雷希特','奥尔科特','奥尔科特','奥尔登','奥尔德','奥尔多','奥尔德雷德','奥尔德伦','奥尔德里奇','奥尔德里克','奥尔德里奇','奥尔德里奇','奥尔德温','奥尔德温','亚历克','亚历杭德罗','阿莱伦','亚历山德罗','亚历西奥','亚历克斯','亚历山大' ,'亚历山大','亚历山德罗','阿列克谢','亚历克西斯','亚历山德','阿尔夫','阿尔菲',
'阿尔弗瑞克','阿尔弗里德','阿尔加','阿尔杰','阿尔杰农','阿尔格农','阿里','阿里贾','阿尔克','阿尔库因','阿尔克温','艾伦','阿拉德','艾伦','艾莉','阿隆','奥尔斯顿','奥尔瓦尔','阿洛因','阿洛伊斯','阿洛伊修斯','阿隆','阿隆索','阿隆索','阿洛伊斯','阿尔方斯','阿尔方斯','阿尔方索','阿尔方索斯','阿尔里克','阿尔特弗里德','奥尔特曼','奥尔顿','阿鲁因','阿尔万','阿尔瓦罗','阿尔维托斯','阿尔文','阿尔维斯','阿尔沃德','阿尔文','阿尔文','阿尔文','阿马迪奥','阿马迪斯','阿马里',
'安格斯','安诺','安斯','安塞尔','安塞尔','安塞尔姆','安塞尔姆','安斯加尔','安谢尔姆','安斯科','安斯利','安斯瓦尔德','安东尼','安东尼','安东','安东尼奥','安东尼','鲍勃','鲍比','鲍比乔','博迪尔','博丹','博多','博加特','博格丹','博尔顿','邦德','邦汉','博尼法斯','伯顿','巴斯特','伯恩','拜伦','凯德','凯登','凯德威尔','凯尔','凯登','凯恩','凯欧','卡尔','卡尔德','阿方索','阿尔弗雷德','阿尔弗雷多','弗雷迪','弗雷德里克','弗雷德里克','弗雷迪','阿尔方斯','阿尔方斯',
'布拉德利','布拉德尼','布雷迪','布雷登','布雷登','布雷登','布拉德','布雷登','布兰','布兰德','布兰登','布兰登','布兰福德','阿纳特','阿诺','阿恩德尔','阿恩特','阿内','阿恩霍尔德','阿尼','阿尼姆','阿诺','加雷特','加菲猫','加林','加里安','加兰','加伦','加林','加内尔','加纳','加内特','加尼尔','加隆','加伦','加勒特','加里克','加林','加里森','加隆','加里森','加文','加里','加里森','加斯康','阿格琳',
'卡登','卡莱尔','卡尔','卡尔顿','卡莱尔','卡洛','卡洛斯','卡尔顿','卡莱尔','卡罗尔','卡罗洛斯','卡罗勒斯','卡林顿,克拉伦斯','克拉克','克劳德','克劳德','克劳迪奥','克劳狄斯','克劳斯','克莱','克莱顿','克莱文','克莱门斯','克莱门特','克莱奥帕斯' ,'康斯坦丁','库珀','铜','科尔本','科尔贝特','科尔宾','科尔比尼安','科尔比','科尔宾','科达莱斯','科德尔','科里','科林','丹佛','丹尼斯','丹泽尔','德翁','德翁特','德克','德瑞克','德瑞克','德瑞尔','德瑞克','德瑞克','德克','德瑞尔',
'道格拉斯','多佛','多伊尔','多伊特','德拉甘','德拉戈','德雷克','德雷文','德鲁','德鲁','杜安','达德利','杜瓦尔','德韦恩','德温','德温农','德怀特','德怀特','德怀特','德怀特','德怀特','德怀特','迪伦','迪伦','伊恩','厄尔','伊斯顿','伊顿','埃博','埃伯哈德','埃卡特','埃克伯特','埃克哈特','埃德','埃迪','埃迪','埃德','埃德尔','埃德尔哈特','埃德加','埃德加','埃德加多','埃德玛','埃德蒙','埃德蒙','埃德蒙','埃德蒙多','埃多','埃德塞尔','爱德华','爱德华多','爱德华',
'爱德华','爱德华多','爱德华兹','爱德华森','埃德温','埃弗莱姆','埃弗莱恩','埃弗莱姆','埃弗伦','埃根','埃尔默','埃尔莫','埃尔莫','埃隆','埃洛伊','埃尔里克','埃尔罗伊','埃尔顿','埃尔顿','埃尔文','埃尔维斯','伊曼纽尔' ,'埃默森','埃默森','埃默里','埃默森','福特','福雷斯特','福顿','财富','弗朗西斯科','弗朗西斯','弗朗西斯科','弗朗西斯','弗朗索瓦','弗兰内克','弗兰克','弗兰克','弗兰基' ,'富兰克林','弗兰科','弗兰奇','弗兰蒂斯克','弗兰兹','弗兰齐斯库斯','弗雷德','弗雷迪',
'热尔维斯','热尔瓦斯','热瓦尔德','热尔温','贾科莫','吉安','吉安-弗朗哥','吉安-卢卡','吉安-马可','吉安卡洛','吉安尼','戈达尔','戈达特','戈达德','戈达特','戈弗雷','戈兰','戈德曼','歌利亚','歌利亚','贡萨洛','戈兰','戈登','格兰杰','格兰特','格兰维尔','格拉蒂安','格拉蒂亚努斯','格雷','格雷森','格拉齐亚诺','格雷戈尔','格雷戈里奥','格雷戈里','格伦维尔','阿马里昂','阿莫德','阿莫里','安伯特',
'瓜达卢佩','瓜尔蒂埃罗','瓜尼罗','吉多','吉福德','纪尧姆','吉列尔莫','古纳尔','古纳尔','炮手','古塔','冈特','冈塔','冈瑟','冈特拉姆','古斯塔夫','古斯塔夫','古斯塔夫','古斯塔夫','古斯特','盖伊','哈克特','哈克特','哈登','霍巴特','霍尔顿','霍尔格','霍尔格','霍尔格','霍利斯','霍尔姆','霍斯特','霍顿','休斯顿','霍华德','豪','休伯特','约拿','乔纳斯','乔纳坦','乔纳森','乔纳森','乔纳森','乔恩','乔尼','乔丹','乔登','乔迪斯','乔登','乔迪','乔尔格',
'哈兰','哈雷','哈龙','哈姆','哈曼','哈曼','哈蒙','哈罗德','哈珀','哈里','哈里森','哈利','哈特莫德','哈特穆特','哈维','哈维','哈桑','哈斯科','哈桑','黑斯廷斯','豪克','哈维尔','哈维尔','霍克' ,'霍桑','海登','海顿','海斯','海约','海伍德','希思','赫克托','赫德利','海科','海默','海因','海纳','海尼','海诺','海因里希','海因茨','海欧','赫克托','海尔格','海尔戈','海利亚斯','海尔克','海尔穆特','海尔穆斯',
'卡尔曼','卡梅隆','卡米尔','坎皮恩','卡姆隆','凯恩','卡尔西','卡里姆','卡雷尔','卡里','卡里姆','卡尔','卡尔','马利','马洛','马龙','马洛','马洛','马米恩','马奎','马奎斯','马奎斯','侯爵','侯爵夫人','马斯登','马斯登','朗','兰利','拉勒米','拉里','拉尔斯','拉鲁','拉萨尔','拉斯洛','拉塞','拉兹洛','拉蒂默','拉特雷尔','朗斯洛特','劳伦斯','洛朗','劳伦斯','劳伦斯','劳克斯','劳伦斯','劳森','莱恩','莱顿','拉撒路','莱尔','莱安德',
'米卡','迈克','米克尔','米兰','迈尔斯','米尔科','米拉德','米勒','米尔斯','米尔森','米罗','米尔特','米尔腾','尼克','尼古拉斯','尼科','尼科德莫','尼古拉','尼古拉斯','尼古拉斯','尼尔斯','尼格尔','尼基尔','尼基塔','尼古拉斯','尼可','帕米罗','潘克拉修斯','潘克拉茨','保罗','冻糕','巴黎','帕克','帕克','帕克','帕克利','帕克斯','帕尔','帕里','帕斯卡','帕斯夸尔','帕斯夸莱','帕特','帕托','帕特里克','帕特里克','帕特登','帕丁','巴顿','保罗',
'奥尔曼','奥尔曼','奥尔南','奥森','奥森德','奥维尔','奥维尔','奥维尔','奥斯巴尔多','奥斯伯特','奥斯本','奥斯本','奥斯卡','奥斯古德','奥斯卡','奥斯玛','奥斯蒙德','奥斯西','奥斯瓦尔多','奥斯瓦尔德','奥斯瓦尔多','奥斯瓦尔','奥斯威尔','奥斯温','奥特格','奥赛罗','奥特玛','奥特玛','奥特蒙德','奥托','奥特温','奥森','奥维','奥维','欧文','牛津','奥克森','奥克斯顿','奥兹','海绵宝宝','巴勃罗','佩西','帕卡德','帕科','帕吉特','佩奇','佩吉特','派恩','佩奇','帕尔默',
'拉斐尔','拉斐尔','拉菲','拉格纳尔','拉胡尔','雷','雷克','雷蒙','雷蒙多','雷蒙','雷蒙','雷纳尔','雷纳','拉姆齐','拉姆齐','拉姆齐','兰德尔','兰迪','游侠','拉尼尔','兰斯登','兰斯福德','兰斯利','赎金','拉乌尔','拉斐尔','罗密欧','罗马尼亚','罗恩','罗纳德','罗纳尔多','罗南','罗尼','索伦','索雷尔','斯潘格勒','斯派克','斯宾塞','斯宾塞','斯宾塞','斯派克','斯皮罗斯','斯普拉格','斯皮里登','斯派罗斯','斯坦伯里',
'沃德利','沃菲尔德','沃福德','沃林','沃利','沃蒙德','沃蒙德','华纳','沃克','沃兰','沃伦','沃里克','泰伊','泰伊斯','泰森','泰勒','泰勒','泰恩','泰瑞','泰瑞尔','泰瑞斯','泰伦','泰隆','泰肖恩','泰森','华盛顿','瓦西里','瓦特','沃特金斯','沃森','瓦特','韦弗利','韦','韦兰','韦伦','韦恩','惠特比','惠特科姆','怀特劳','惠特菲尔德','惠特福德','惠特利','惠特洛克','惠特曼','惠特莫尔','惠特克','威特','威克莱夫',
'温斯洛','温莎','温斯顿','温思罗普','温顿','温沃德','维塔斯','维特','维顿','弗拉基米尔','扬尼克','扬尼斯','亚辛','耶胡迪','约里克','约克','约瑟夫','尤尔','扎切里','扎克','扎克瑞','扎克瑞','扎多克','扎因','扎伊尔','扎卡里','扎德','扎恩','扎维尔','扎恩','撒迦利亚'
]
        }
    },
    methods: {
        generateName(type) {
            let name = '';
            switch(type) {
                case 'Human':
                    name = this.human[Math.floor(Math.random() * this.human.length)];
                    break;
            }
            return name;
        }
    }
}
