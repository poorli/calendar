/**
 * Created by LiYong on 2016/4/8.
 */
var calendar = {
    /**
     * 农历1900-2100的润大小信息表,每年用5位16进制数字表示。
     * 第1位表示闰年的闰月信息，1表示月大，0为月小。
     * 第2、3、4位转化为2进制共12比特，分别对应12月的天数，1为月大，2为月小。
     * 第5位表示闰年闰哪个月
     * @Array Of Property
     * @return Hex
     */
    lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,//1900-1909
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,//1910-1919
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,//1920-1929
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,//1930-1939
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,//1940-1949
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,//1950-1959
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,//1960-1969
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,//1970-1979
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,//1980-1989
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,//1990-1999
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,//2000-2009
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,//2010-2019
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,//2020-2029
        0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,//2030-2039
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,//2040-2049
    /**Add By JJonline@JJonline.Cn**/
        0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,//2050-2059
        0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,//2060-2069
        0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,//2070-2079
        0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,//2080-2089
        0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,//2090-2099
        0x0d520],
    /**
     * 公历1900-2100的节气信息表,每年用30位16进制数字表示。
     * 每五位一组代表两个月的四个节气信息
     * 映射关系：由于每个月的两个节气前一个为单数日后一个为双数日，则两个月的节气日期连接成一个长6位的字符串，将其代表的十进制数转化为16进制即得到一组4位的十六进制数
     * @Array Of Property
     * @return String
     */
    solarTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],
    solarTerm: ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"],
    gan: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
    zhi: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
    animals: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
    //公历节日
    internationalHoliday: ["0101 元旦", "0202 世界湿地日", "0207 国际声援南非日", "0210 国际气象节", "0214 情人节", "0301 国际海豹日", "0303 全国爱耳日", "0308 妇女节", "0312 植树节 孙中山逝世纪念日", "0314 国际警察日", "0315 国际消费者权益日", "0317 中国国医节 国际航海日", "0321 世界森林日 消除种族歧视国际日", "0321 世界儿歌日", "0322 世界水日", "0323 世界气象日", "0324 世界防治结核病日", "0325 全国中小学生安全教育日", "0330 巴勒斯坦国土日", "0401 愚人节 全国爱国卫生运动月(四月) 税收宣传月(四月)", "0407 世界卫生日", "0422 世界地球日", "0423 世界图书和版权日", "0424 亚非新闻工作者日", "0501 劳动节", "0504 中国五四青年节", "0505 碘缺乏病防治日", "0508 世界红十字日", "0512 国际护士节", "0515 国际家庭日", "0517 世界电信日", "0518 国际博物馆日", "0520 全国学生营养日", "0523 国际牛奶日", "0531 世界无烟日", "0601 儿童节", "0605 世界环境日", "0606 全国爱眼日", "0617 防治荒漠化和干旱日", "0623 国际奥林匹克日", "0625 全国土地日", "0626 国际反毒品日", "0701 中国共产党建党日 世界建筑日", "0702 国际体育记者日", "0707 中国人民抗日战争纪念日", "0711 世界人口日", "0730 非洲妇女日", "0801 中国建军节", "0808 中国男子节(爸爸节)", "0815 日本正式宣布无条件投降日", "0908 国际扫盲日 国际新闻工作者日", "0910 教师节", "0914 世界清洁地球日 梅竹松 生日^o^", "0916 国际臭氧层保护日", "0918 九·一八事变纪念日", "0920 国际爱牙日", "0927 世界旅游日", "1001 国庆节 世界音乐日 国际老人节", "1001 国际音乐日", "1004 世界动物日", "1008 全国高血压日", "1008 世界视觉日", "1009 世界邮政日 万国邮联日", "1010 辛亥革命纪念日 世界精神卫生日", "1013 世界保健日 国际教师节", "1014 世界标准日", "1015 国际盲人节(白手杖节)", "1016 世界粮食日", "1017 世界消除贫困日", "1022 世界传统医药日", "1024 联合国日 世界发展信息日", "1031 世界勤俭日", "1107 十月社会主义革命纪念日", "1108 中国记者日", "1109 全国消防安全宣传教育日", "1110 世界青年节", "1111 国际科学与和平周(本日所属的一周)", "1112 孙中山诞辰纪念日", "1114 世界糖尿病日", "1117 国际大学生节 世界学生节", "1121 世界问候日 世界电视日", "1129 国际声援巴勒斯坦人民国际日", "1201 世界艾滋病日", "1203 世界残疾人日", "1205 国际经济和社会发展志愿人员日", "1208 国际儿童电视日", "1209 世界足球日", "1210 世界人权日", "1212 西安事变纪念日", "1213 南京大屠杀(1937年)纪念日！紧记血泪史！", "1221 国际篮球日", "1224 平安夜", "1225 圣诞节", "1229 国际生物多样性日"],
    //以某月第几天星期的星期几记得公历节日
    internationalHolidayBaseWeek: ["0110 黑人日", "0150 世界麻风日", "0520 母亲节", "0530 全国助残日", "0630 父亲节", "0932 国际和平日", "0940 儿童日", "0950 世界海事日", "1011 国际住房日", "1013 国际减轻自然灾害日", "1144 感恩节"],
    //农历节日
    lunarHolidayIfo: [
        "0101 春节",
        "0115 元宵节",
        "0202 龙抬头节",
        "0323 妈祖生辰 (天上圣母诞辰)",
        "0505 端午节",
        "0707 中国情人节",
        "0815 中秋节",
        "0909 重阳节",
        "1208 腊八节",
        "0100 除夕"],
    weekIfo: ['一', '二', '三', '四', '五', '六', '日'],
    lunarDayName: ['初', '十', '廿', '卅'],
    lunarMonthName: ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'],
    monthChineseList: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
    //农历天转为汉语表示
    toLunarDayName: function (d) {
        var name;
        switch (d) {
            case 10:
                name = "初十";
                break;
            case 20:
                name = "廿十";
                break;
            case 30:
                name = "卅十";
                break;
            default:
            {
                name = calendar.lunarDayName[Math.floor(d / 10)];
                name += calendar.monthChineseList[d % 10 - 1];
            }
        }
        return name;
    },
    //农历月转为汉语表示
    toLunarMonthName: function (m) {
        var name = calendar.lunarMonthName[m - 1];
        name += "月";
        return name;
    },
    /**
     * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
     * @param {Number} y 农历年份
     * @return {Number} (0-12)
     */
    getLeapMonth: function (y) {
        return calendar.lunarInfo[y - 1900] & 0xf;
    },
    /**
     * 返回农历y年闰月的天数 若该年没有闰月则返回0
     * @param {Number} y 农历年份
     * @return {Number} (0、29、30)
     */
    getLeapMonthDays: function (y) {
        if (calendar.getLeapMonth(y)) {
            return (calendar.lunarInfo[y - 1900] & 0x10000) ? 30 : 29;
        }
        return 0;
    },
    /**
     * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
     * @param {Number} y 农历年份
     * @return {number} (-1、29、30)
     */
    getLunarMonthDays: function (y, m) {
        if (m > 12 || m < 1) {
            return -1
        }//月份参数从1至12，参数错误返回-1
        return ( (calendar.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29 );
    },
    /**
     * 返回农历y年一整年的总天数
     * @param {Number} y 农历年份
     * @return {Number}
     */
    getLunarYearDays: function (y) {
        var i, sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1) {
            sum += (calendar.lunarInfo[y - 1900] & i) ? 1 : 0;
        }
        return (sum + calendar.getLeapMonthDays(y));
    },
    /**
     * 获取公历日期对应的农历年份和和该天为公历的第几天
     * @param {Number} y 公历年份
     * @param {Number} m 公历月份
     * @param {Number} d 公历日
     * @return {Obeject} lunarYear 公历年份 lunarYearDays公历的第几天
     * */
    getLunarYear: function (y, m, d) {
        //农历1900年一月初一即1900年1月31日的UTC秒数
        var seconds = Date.UTC(y, m - 1, d);
        var lunarYear;
        var lunarYearDays;
        var offsetDay = (seconds - Date.UTC(1900, 0, 31)) / 86400000;
        var temp;
        for (var i = 1900; offsetDay > 0; i++) {
            temp = calendar.getLunarYearDays(i);
            offsetDay -= temp;
        }
        if (offsetDay < 0) {
            i--;
            offsetDay = offsetDay + temp;
        }
        lunarYear = i;
        lunarYearDays = offsetDay + 1;
        return {
            'lunarYear': lunarYear,
            'lunarYearDays': lunarYearDays
        };
    },
    /**
     * 获取公历日期对应的农历月份、是否为闰月以及该天为当月的第几天
     * @param {Number} y 公历年份
     * @param {Number} m 公历月份
     * @param {Number} d 公历日
     * @return {Number} lunarMonth 农历月份 isLeapMonth 是否为闰月 lunarMonthDays 当月的第几天
     * */
    getLunarMonth: function (y, m, d) {
        var lunarYearDays = calendar.getLunarYear(y, m, d).lunarYearDays;
        var lunarMonth,
            lunarMonthDays,
            temp;
        var leapMonth = calendar.getLeapMonth(y);
        var isLeapMonth = false;
        var i = 1;
        do {
            temp = calendar.getLunarMonthDays(y, i);
            lunarYearDays -= temp;
            if (lunarYearDays > 0 && leapMonth == i) {
                if (lunarYearDays >= 0) {
                    isLeapMonth = true;
                }
                temp = calendar.getLeapMonthDays(y);
                lunarYearDays -= temp;
            }
            i++;
        } while (i < 13 && lunarYearDays > 0);
        if (lunarYearDays <= 0) {
            i--;
            lunarYearDays += temp;
        }
        lunarMonth = i;
        lunarMonthDays = lunarYearDays;
        return {
            'lunarMonth': lunarMonth,
            'isLeapMonth': isLeapMonth,
            'lunarMonthDays': lunarMonthDays
        }
    },
    /**
     * 获取公历日期对应的农历日
     * @param {Number} y 公历年份
     * @param {Number} m 公历月份
     * @param {Number} d 公历日
     * @return {Number} 日
     * */
    getLunarDay: function (y, m, d) {
        return calendar.getLunarMonth(y, m, d).lunarMonthDays;
    },
    /**
     * 获取公历日期对应的年月日
     * @param {Number} y 公历年份
     * @param {Number} m 公历月份
     * @param {Number} d 公历日
     * @return {Object}
     * */
    solarDateToLunarDate: function (y, m, d) {
        var lunar = {};
        lunar.year = calendar.getLunarYear(y, m, d).lunarYear;
        lunar.month = calendar.getLunarMonth(y, m, d).lunarMonth;
        lunar.day = calendar.getLunarDay(y, m, d);
        return lunar;
    },
    /**
     * 年份转生肖,划分生肖分界线采用正月初一
     * @param {number} y 公历年
     * @param {number} y 公历月
     * @param {number} y 公历日
     * @return {string} 生肖名
     */
    getAnimals: function (y, m, d) {
        var lunarYear = calendar.getLunarYear(y, m, d).lunarYear;
        //console.log(lunarYear);
        return calendar.animals[(lunarYear - 4) % 12];
    },
    /**
     * 获取干支年*/
    toGanZhi: function (offsetLunarYear) {
        return (calendar.gan[offsetLunarYear % 10] + calendar.zhi[offsetLunarYear % 12]);
    },
    getGanZhi: function (y, m, d) {
        var lunarYear = calendar.getLunarYear(y, m, d).lunarYear;
        var chunJie = calendar.getTerm(y, 3);
        var ganZhi = {};
        //ganZhiYear,ganZhiMonth,ganzhiDay;
        var offsetLunarYear = lunarYear - 4;
        if (m < 3 && d < chunJie) {
            offsetLunarYear = lunarYear - 5;
        }
        ganZhi.ganZhiYear = calendar.toGanZhi(offsetLunarYear);
        var firstNode = calendar.getTerm(y, (m * 2 - 1));//返回当月「节」为几日开始
        //依据12节气修正干支月
        ganZhi.ganZhiMonth = calendar.toGanZhi((lunarYear - 1900) * 12 + m + 11);
        if (d >= firstNode) {
            ganZhi.ganZhiMonth = calendar.toGanZhi((lunarYear - 1900) * 12 + m + 12);
        }
        //日柱 当月一日与 1900/1/1 相差天数
        var dayCyclical = Date.UTC(y, m - 1, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
        ganZhi.ganzhiDay = calendar.toGanZhi(dayCyclical + d - 1);
        return ganZhi;
    },
    /**
     * 获取公历日期对应的详细信农历中文名称
     * @param {Number} y 公历年份
     * @param {Number} m 公历月份
     * @param {Number} d 公历日
     * @return {Object} 月 日 干支年 干支月 干支日 生肖
     * */
    getLunarDetailChineseIfo: function (y, m, d) {
        var lunar = calendar.solarDateToLunarDate(y, m, d);
        //console.log(lunar);
        var ganZhi = calendar.getGanZhi(y, m, d);
        lunarName = {};
        lunarName.month = calendar.toLunarMonthName(lunar.month);
        if (calendar.getLunarMonth(y, m, d).isLeapMonth) {
            lunarName.month = '润' + calendar.toLunarMonthName(lunar.month);
        }
        lunarName.day = calendar.toLunarDayName(lunar.day);
        lunarName.ganZhiYear = ganZhi.ganZhiYear + '年';
        lunarName.ganZhiMonth = ganZhi.ganZhiMonth + '月';
        lunarName.ganZhiDay = ganZhi.ganzhiDay + '日';
        lunarName.animals = calendar.getAnimals(y, m, d);
        return lunarName;
    },
    /**
     * 返回公历某天的星期数，1-7分别代表周一到周日
     * @param {number} y 四位数的年份
     * @param {number} m 月
     * @param {number} d 日
     * @return {number} 星期几的数字*/
    getWeek: function (y, m, d) {
        var date = new Date(y, m - 1, d);//注意Date的第二个参数，0为第一月，没注意掉坑了。
        var week = date.getDay();
        if (week == 0) {
            week = 7;
        }
        return week;
    },
    /**
     * 获取公历某天是该月第几个星期
     * @param {number} y 公历年份
     * @param {number} m 公历月份
     * @param {number} d 公历月份
     * @return {number} weekNum 星期数
     * */
    getWeekOfMonth: function (y, m, d) {
        var weekNum;
        var firstDayWeek = calendar.getWeek(y, m, 1);
        if (d <= (8 - firstDayWeek)) {
            weekNum = 1;
        } else {
            weekNum = Math.ceil((d - (8 - firstDayWeek)) / 7 + 1);
        }
        return weekNum;
    },
    /**
     * 返回公历某年某月天数
     * @param {number} y 公历年份
     * @param {number} m 公历月份
     * @return {number} 该月份天数
     * */
    getMonthDays: function (y, m) {
        var solarMonthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((y % 4 == 0 && y % 100 != 0) || (y % 400 == 0)) {
            solarMonthDay[1] += 1;
        }
        return solarMonthDay[m - 1];
    },
    /**
     * 返回公历某年第n个节气在当月的第几号
     * @param {number} y 公历年份
     * @param {number} m 公历月份
     * @return {number} 该月的某天
     * */
    getTerm: function (y, n) {
        if (y < 1900 || y > 2100 || n < 1 || n > 24) {
            return -1;
        }
        var yearData = calendar.solarTermInfo[y - 1900];
        var twoMonthData = new Array(6);
        for (var i = 0; i < 6; i++) {
            twoMonthData[i] = parseInt('0x' + yearData.substr(i * 5, 5)).toString();
        }
        var data;
        var op = (n - 1) % 4;
        var listNum = Math.floor((n - 1) / 4);
        switch (op) {
            case 0:
                data = twoMonthData[listNum].substr(0, 1);
                break;
            case 1:
                data = twoMonthData[listNum].substr(1, 2);
                break;
            case 2:
                data = twoMonthData[listNum].substr(3, 1);
                break;
            case 3:
                data = twoMonthData[listNum].substr(4, 2);
                break;
            default:
                return -1;
        }
        return parseInt(data);
    },
    /**
     * 判断是否为节气
     * @param {number} y 公历的年份
     * @param {number} m 公历的月份
     * @param {number} d 公历的日期
     * @return {string} {LunarHolidayName,0} 是节气返回节气名否则返回0
     * */
    isTerm: function (y, m, d) {
        var termName = null;
        var firstTerm = calendar.getTerm(y, m * 2 - 1);
        var secondTerm = calendar.getTerm(y, m * 2);
        if (d == firstTerm) {
            termName = calendar.solarTerm[m * 2 - 2];
        }
        if (d == secondTerm) {
            termName = calendar.solarTerm[m * 2 - 1];
        }
        return termName;
    },
    /**
     * 返回国际节假日信息
     * @param {string} holidayIfo 提供国际节假日信息的字符串
     * @return  {object}
     * */
    getHolidayIfo: function (holidayIfo) {
        var month,
            day,
            name;
        if (holidayIfo[0] == '0') {
            month = parseInt(holidayIfo[1]);
        } else {
            month = parseInt(holidayIfo.substr(0, 2), 10);
        }
        if (holidayIfo[2] == 0) {
            day = parseInt(holidayIfo[3], 10);
        } else {
            day = parseInt(holidayIfo.substr(2, 2), 10);
        }
        name = holidayIfo.substr(5);
        //console.log(month+" "+day+":"+name);
        return {
            "month": month,
            "day": day,
            "name": name
        };
    },
    isSolarHoliday: function (m, d) {
        var holidayObj = {};
        var holidayName = null;
        for (var i = 0; i < calendar.internationalHoliday.length; i++) {
            holidayObj = calendar.getHolidayIfo(calendar.internationalHoliday[i]);
            if (m == holidayObj.month && d == holidayObj.day) {
                return holidayObj.name;
            }
        }
        return holidayName;
    },
    /**
     * 判断是否为农历节日
     * @param {number} y 公历的年份
     * @param {number} m 公历的月份
     * @param {number} d 公历的日期
     * @return {string} {LunarHolidayName,0} 是农历节日返回节日名否则返回0
     * */
    isLunarHoliday: function (y, m, d) {
        var lunarMonth = calendar.getLunarMonth(y, m, d).lunarMonth;
        var lunarDay = calendar.getLunarDay(y, m, d);
        var lunarHolidayName = null;
        for (var i = 0; i < calendar.lunarHolidayIfo.length; i++) {
            var lunarHoliday = calendar.getHolidayIfo(calendar.lunarHolidayIfo[i]);
            if (lunarMonth == lunarHoliday.month && lunarDay == lunarHoliday.day) {
                lunarHolidayName = lunarHoliday.name;
            }
        }
        return lunarHolidayName;
    },
    /**
     * 返回以星期计算的国际节假日信息
     * @param {string} holidayIfo 提供国际节假日信息的字符串
     * @return  {object}
     * month 月份
     *weekNum 星期数
     *week 星期几
     *name 节日名
     * */
    getHolidayIfoBaseWeek: function (holidayIfo) {
        var month,
            weekNum,
            week,
            name;
        if (holidayIfo[0] == '0') {
            month = parseInt(holidayIfo[1]);
        } else {
            month = parseInt(holidayIfo.substr(0, 2), 10);
        }
        weekNum = parseInt(holidayIfo[2]);
        week = parseInt(holidayIfo[3]);
        if (week == 0) {
            week = 7;
        }
        name = holidayIfo.substr(5);
        return {
            "month": month,
            "weekNum": weekNum,
            "week": week,
            "name": name
        }
    },
    isSolarHolidayBaseOnWeek: function (y, m, d) {
        var week,
            weekNum,
            holidayName = null,
            holidayObj = {};
        week = calendar.getWeek(y, m, d);
        weekNum = calendar.getWeekOfMonth(y, m, d);
        //console.log("第几个星期"+weekNum+" 星期几"+week);
        for (var i = 0; i < calendar.internationalHolidayBaseWeek.length; i++) {
            holidayObj = calendar.getHolidayIfoBaseWeek(calendar.internationalHolidayBaseWeek[i]);
            //console.log(holidayObj);
            if (m == holidayObj.month && weekNum == holidayObj.weekNum && week == holidayObj.week) {
                holidayName = holidayObj.name;
            }
        }
        return holidayName;
    },
    /**
     * 获取节假日信息
     * @param {number} y 公历年份
     * @param {number} m 公历月份
     * @param {number} d 公历日
     * @return {Object}
     * displayHoliday 作为简要展示的节假日
     * solarHoliday 公历节日
     * solarHolidayBaseOnWeek 以星期信息确定的公历节日 s
     * olarTerm 节气 lunarHoliday农历节日
     * */
    isHoliday: function (y, m, d) {
        var displayedHoliday = null;
        var isSolarHoliday = calendar.isSolarHoliday(m, d);
        var isSolarHolidayBaseOnWeek = calendar.isSolarHolidayBaseOnWeek(y, m, d);
        var isSolarTerm = calendar.isTerm(y, m, d);
        var isLunarHoliday = calendar.isLunarHoliday(y, m, d);
        if (isSolarHoliday != null) {
            displayedHoliday = isSolarHoliday;
        }
        if (isSolarHolidayBaseOnWeek != null) {
            displayedHoliday = isSolarHolidayBaseOnWeek;
        }
        if (isSolarTerm != null) {
            displayedHoliday = isSolarTerm;
        }
        if (isLunarHoliday != null) {
            displayedHoliday = isLunarHoliday;
        }
        return {
            'displayHoliday': displayedHoliday,
            'solarHoliday': isSolarHoliday,
            'solarHolidayBaseOnWeek': isSolarHolidayBaseOnWeek,
            'solarTerm': isSolarTerm,
            'lunarHoliday': isLunarHoliday
        }
    },
    /**
     * 生成包含公历某一天信息的元素
     * @param {number} y 公历年份
     * @param {number} m 公历月份
     * @param {number} d 公历日
     * @return 返回含一天信息的元素
     * */
    createDayContent: function (y, m, d) {
        //var list = document.createElement("list");
        //addClassName(list, "day-info-box");
        var div = document.createElement("div");
        addClassName(div, "day-border-box");
        div.setAttribute("data", y + "/" + m + "/" + d);
        var solar = document.createElement("p");
        var weekday = calendar.getWeek(y, m, d);
        if (weekday == 6 || weekday == 7) {
            addClassName(solar, "weekends");
        }
        addClassName(solar, "day-ifo");
        setTextContent(solar, d);
        div.appendChild(solar);
        var holiday = calendar.isHoliday(y, m, d).displayHoliday;
        var lunar = document.createElement("p");
        addClassName(lunar, "holiday-ifo");
        setTextContent(lunar, calendar.getLunarDetailChineseIfo(y, m, d).day);
        if (holiday != null) {
            setTextContent(lunar, holiday);
            addClassName(lunar, "holiday-preview-box")
        }
        div.appendChild(lunar);
        //list.appendChild(div);
        //return list;
        return div;
    },
    /**
     * 生成包含公历某一月信息的元素
     * @param {number} y 公历年份
     * @param {number} m 公历月份
     * @param {number} d 公历日
     * @return 返回含一天信息的元素
     * */
    createMonthContent: function (y, m) {
        var fragment = document.createDocumentFragment();
        var data = new Date(y, m - 1);
        var mondays = calendar.getMonthDays(y, m);
        var week = data.getDay();
        if (week == 0) {
            week = 7;
        }
        var rows = Math.ceil([mondays + (week - 1)] / 7);
        var divs = new Array(rows);
        for (var i = 0; i < rows; i++) {
            divs[i] = document.createElement("div");
        }
        for (var i = 0; i < rows * 7; i++) {
            var lastMonthCrossDays = week - 1;
            var realy;
            var realm;
            var reald;
            var crossDayClassName = "";
            if (i < lastMonthCrossDays) {
                if (m == 1) {
                    realy = y - 1;
                    realm = 12;
                } else {
                    realy = y;
                    realm = m - 1;
                }
                var lastMonthDay = calendar.getMonthDays(realy, realm);
                reald = lastMonthDay - (lastMonthCrossDays - i - 1);
                crossDayClassName = "cross-day";
            }
            else if (i < lastMonthCrossDays + mondays) {
                realy = y;
                realm = m;
                reald = i - lastMonthCrossDays + 1;
            }
            else {
                if (m == 12) {
                    realy = y + 1;
                    realm = 1;
                } else {
                    realy = y;
                    realm = m + 1;
                }
                reald = i - (lastMonthCrossDays + mondays) + 1;
                crossDayClassName = "cross-day";
            }
            var list = calendar.createDayContent(realy, realm, reald);
            list.id = i;
            addClassName(list, crossDayClassName);
            var listBox = document.createElement("list");
            listBox.appendChild(list);
            addClassName(listBox, "day-info-box");
            divs[parseInt(i / 7)].appendChild(listBox);
        }
        for (var i = 0; i < rows; i++) {
            fragment.appendChild(divs[i]);
        }
        return fragment;
    },
    /**
     * 生成包含公历某一天的详细信息
     * @param {number} y 公历年份
     * @param {number} m 公历月份
     * @param {number} d 公历日
     * @return 返回含一天详细信息的元素
     * */
    createDayDetailIfoContent: function (y, m, d) {
        var lunar = calendar.getLunarDetailChineseIfo(y, m, d);
        var fragment = document.createElement("div");
        addClassName(fragment, "detail-box")
        var p = new Array(5);
        for (var i = 0; i < p.length; i++) {
            p[i] = document.createElement("p");
            addClassName(p[i], "detail-ifo" + i);
        }
        setTextContent(p[0], y + '-' + m + '-' + d + ' ' + '星期' + calendar.weekIfo[calendar.getWeek(y, m, d) - 1]);
        fragment.appendChild(p[0]);
        setTextContent(p[1], d);
        fragment.appendChild(p[1]);
        setTextContent(p[2], lunar.month + lunar.day);
        fragment.appendChild(p[2]);
        setTextContent(p[3], lunar.ganZhiYear + "【" + lunar.animals + "】");
        fragment.appendChild(p[3]);
        setTextContent(p[4], lunar.ganZhiMonth + " " + lunar.ganZhiDay);
        fragment.appendChild(p[4]);
        //console.log(fragment);
        return fragment;
    },
    /**
     * 生成包含公历某一天的详细节假日信息的元素
     * @param {number} y 公历年份
     * @param {number} m 公历月份
     * @param {number} d 公历日
     * @return 返回含一天节假日信息的元素
     * */
    creteHolidayContent: function (y, m, d) {
        var fragment = document.createElement("div");
        //var div=document.createElement("div");
        addClassName(fragment, "holiday-box")
        var holiday = calendar.isHoliday(y, m, d);
        var p = new Array(4);
        for (var i = 0; i < p.length; i++) {
            p[i] = document.createElement("p");
            addClassName(p[i], "holiday-item" + i);
        }
        if (holiday.displayHoliday != null) {
            if (holiday.solarHoliday != null) {
                setTextContent(p[0], holiday.solarHoliday);
                fragment.appendChild(p[0]);
            }
            if (holiday.solarHolidayBaseOnWeek != null) {
                setTextContent(p[1], holiday.solarHolidayBaseOnWeek);
                fragment.appendChild(p[1]);
            }
            if (holiday.solarTerm != null) {
                setTextContent(p[2], holiday.solarTerm);
                fragment.appendChild(p[2]);
            }
            if (holiday.lunarHoliday != null) {
                setTextContent(p[3], holiday.lunarHoliday);
                fragment.appendChild(p[3]);
            }
        }
        //console.log(fragment);
        return fragment;
    }
};

/**
 * 更新样式和添加天选择框的事件
 * @param {Object} selectDate 存放交互所需的信息对象
 * */
function rewriteDate(selectDate) {
    //显示新的年和月
    selectDate.yearDisplayElement.innerHTML = selectDate.month + "月";
    selectDate.monthDisplayElement.innerHTML = selectDate.year + "年";
    //清楚天选择框和年选择框上次被选中的项添加样式
    removeClassName(selectDate.changeButton[selectDate.preSelectedMonth + 200], selectDate.selectedClassName);
    removeClassName(selectDate.changeButton[selectDate.preSelectedYear - 1900], selectDate.selectedClassName);
    //给天选择框和年选择框当前被选中的项添加样式
    addClassName(selectDate.changeButton[selectDate.month + 200], selectDate.selectedClassName);
    addClassName(selectDate.changeButton[selectDate.year - 1900], selectDate.selectedClassName);
    //更新上次被选中的日期信息
    selectDate.setPreDate(selectDate.year, selectDate.month, selectDate.day);
    //更新选择框的滚动的高度
    var dropdownMenubox = document.getElementsByClassName(selectDate.dropownControlContentClassName);
    var size = dropdownMenubox[0].parentNode.style.fontSize;
    var yearScrollTop = Math.floor((selectDate.year - 1900) / 12) * parseInt(size, 10) * 18;
    dropdownMenubox[0].scrollTop = yearScrollTop;

    var dayBox = document.getElementsByClassName(selectDate.dayBoxClassName);
    for (var i = 0; i < dayBox.length; i++) {
        var dataString = dayBox[i].getAttribute("data");
        var date = getSelectDateIfo(dataString);
        //为新选中的天的容器添加边框
        if (selectDate.year == date.year && selectDate.month == date.month && selectDate.day == date.day) {
            addClassName(dayBox[i], "selected-day-box");
        }
        //清除上次被选中的天的盒子的边框
        if (selectDate.preSelectedYear == data.year && selectDate.preSelectedMonth && data.day == selectDate.preSelectedDay) {
            removeClassName(dayBox[i], "selected-day-box");
        }
        //为当天的容器添加背景
        if (selectDate.todayYear == date.year && selectDate.todayMonth == date.month && selectDate.todayDay == date.day) {
            addClassName(dayBox[i], "selected-day-box");
            addClassName(dayBox[i], "today-box");
        }
    }
    //更新日历右部的高度
    detailIfoBox.style.height = 0;
    var calendar0 = document.getElementsByClassName("calendar")[0];
    detailIfoBox.style.height = calendar0.offsetHeight + "px";
    //每次选定日期后立即隐藏选择框(年、月)的内容
    var dropownControlContent = document.getElementsByClassName(selectDate.dropownControlContentClassName);
    for (var i = 0; i < dropownControlContent.length; i++) {
        dropownControlContent[i].style.visibility = "hidden";
    }
    //每次更新日历后重新为天选择框添加事件
    selectDay(selectDate.dayBoxClassName);
}

/**
 * 更新日历右部分的信息
 * @param {Object} selectDate 存放交互所需信息的对象
 * @return {Element} 返回存放日历右部分信息的元素
 * */
function addDetailToCalendar(selectDate) {
    selectDate.detaiIfoBox.innerHTML = "";
    //添加日历左上部的详细的日期信息
    var dayDetailIfoContent = calendar.createDayDetailIfoContent(selectDate.year, selectDate.month, selectDate.day);
    //添加日历右下部分节假日的信息
    var holidayIfo = calendar.creteHolidayContent(selectDate.year, selectDate.month, selectDate.day);
    selectDate.detaiIfoBox.appendChild(dayDetailIfoContent);
    selectDate.detaiIfoBox.appendChild(holidayIfo);
}

/**
 * 更新日历
 * @param {Object} selectDate 存放交互所需信息的对象
 * */
function addNewMonthToCalendar(selectDate) {
    //更新左部分信息
    selectDate.calendarBox.innerHTML = "";
    var newMonth = calendar.createMonthContent(selectDate.year, selectDate.month);
    selectDate.calendarBox.appendChild(newMonth);
    //更新日历右部分的信息
    addDetailToCalendar(selectDate);
    //更新样式和添加天选择框的事件
    rewriteDate(selectDate);
}

//定义存放交互所需信息的对象
function SelectDate() {
}
SelectDate.prototype = {
    constructor: SelectDate,
    //初始化今天的日期信息
    initToday: function () {
        var data = new Date();
        var y = data.getFullYear(),
            m = data.getMonth() + 1,
            d = data.getDate();
        SelectDate.prototype.todayYear = y;
        SelectDate.prototype.todayMonth = m;
        SelectDate.prototype.todayDay = d;
    },
    //设置当前被选中的日期信息
    setSelectedDate: function (year, month, day) {
        SelectDate.prototype.year = year;
        SelectDate.prototype.month = month;
        SelectDate.prototype.day = day;
    },
    //设置上次被选中日期的信息
    setPreDate: function (preSelectedYear, preSelectedMonth, preSelectedDay) {
        SelectDate.prototype.preSelectedYear = preSelectedYear;
        SelectDate.prototype.preSelectedMonth = preSelectedMonth;
        SelectDate.prototype.preSelectedDay = preSelectedDay;
    },
    //
    /**
     * 初始化交互所需元素或类名
     * @param {Element} calendarBox 存放日历左部每月信息的元素
     * @param {Element} detailIfoBox 存放日历右部某天详细信息的元素
     * @param {Element} yearDisplayElement 显示选中的年
     * @param {Element} monthDisplayElement 显示选中的月
     * @param {String} changeButton  年月选择框每项的className，用于获取当前选择的年月信息和更新年月选择框的相关样式
     * @param {String} dayBoxClassName 存放每天信息元素的className，用于获取当前选中框的日期信息
     * @param {String} selectedClassName 当前选中天的className，用于设置当前选中天的样式
     * @param {String} dropdownToggleClassName 年月选择框下拉按钮的className,用于控制选择框的显示
     * @param {String} dropownControlContentClassName 年月选择框下拉按钮的className,用于控制选择框的显示
     * */
    initDateDisplayElement: function (calendarBox, detailIfoBox, yearDisplayElement, monthDisplayElement, changeButton, dayBoxClassName, selectedClassName, dropdownToggleClassName, dropownControlContentClassName) {
        SelectDate.prototype.calendarBox = calendarBox;
        SelectDate.prototype.detaiIfoBox = detailIfoBox;
        SelectDate.prototype.yearDisplayElement = yearDisplayElement;
        SelectDate.prototype.monthDisplayElement = monthDisplayElement;
        SelectDate.prototype.changeButton = changeButton;
        SelectDate.prototype.dayBoxClassName = dayBoxClassName;
        SelectDate.prototype.selectedClassName = selectedClassName;
        SelectDate.prototype.dropdownToggleClassName = dropdownToggleClassName;
        SelectDate.prototype.dropownControlContentClassName = dropownControlContentClassName;
    }
};

//创建对象SelectDate的实例selectDate
var selectDate = new SelectDate();
//初始化selectDate
var calendarBox = document.getElementById("calendar-content-box");
var detailIfoBox = document.getElementById("new-calendar-right");
var yearDisplay = document.getElementById("year-display");
var monthDisplay = document.getElementById("month-display");
var optionClassName = "dropdown-option";
var changeButton = document.getElementsByClassName(optionClassName);
var dayBoxClassName = "day-border-box";
var selectedClassName = "dropdown-option-selected";
var dropdownToggleClassName = "dropdown-btn-group";
var dropdownControlContentClassName = "dropdown-menu";
var data = new Date();
var y = data.getFullYear(),
    m = data.getMonth() + 1,
    d = data.getDate();
//初始化今天的日期信息
selectDate.initToday();
//设置上次被选中日期的信息
selectDate.setSelectedDate(y, m, d);
//设置当前被选中的日期信息
selectDate.setPreDate(selectDate.year, selectDate.month, selectDate.day);
//初始化交互所需元素或类名
selectDate.initDateDisplayElement(calendarBox, detailIfoBox, monthDisplay, yearDisplay, changeButton, dayBoxClassName, selectedClassName, dropdownToggleClassName, dropdownControlContentClassName);
//创建日历
addNewMonthToCalendar(selectDate);

/**
 * 获取选中的天选择框的日期信息
 * @param {string} 形式为2016/4/12的字符串信息
 * @retrun {object} year,month,day 年月日
 * */
function getSelectDateIfo(string) {
    var date = {};
    var ifos = string.split("/");
    date.year = parseInt(ifos[0], 10);
    date.month = parseInt(ifos[1], 10);
    date.day = parseInt(ifos[2], 10);
    return date;
}

/**
 * 为每个天选择框添加click事件
 * @param {String} dayBoxClassName 天选择框的className
 * */
function selectDay(dayBoxClassName) {
    var dayButton = document.getElementsByClassName(dayBoxClassName);
    for (var i = 0; i < dayButton.length; i++) {
        var handler = function () {
            var dateString = dayButton[this.id].getAttribute("data");
            var date = getSelectDateIfo(dateString);
            selectDate.year = date.year;
            selectDate.month = date.month;
            selectDate.day = date.day;
            addNewMonthToCalendar(selectDate);
            addDetailToCalendar(selectDate);
        };
        dayButton[i].onclick = handler;
    }
}

/**
 * 判断所选择的年份在1900-2100之间,小于1900时置位1900，大于2100时置为2100
 * @param {Object} selectDate
 * @retun {Boolean} true or false*/
function isLegalSelectDate(selectDate) {
    if (selectDate.year <= 2100 && selectDate.year >= 1900) {
        return true;
    } else {
        if (selectDate.year < 1900) {
            selectDate.year = 1900;
        }
        if (selectDate.year > 2100) {
            selectDate.year = 2100;
        }
        return false;
    }
}

//获取这个月上一年的日历
function getPreYearCalendar(selectDate) {
    selectDate.year--;
    if (!isLegalSelectDate(selectDate)) {
        return;
    }
    addNewMonthToCalendar(selectDate);
}
var preYearButton = document.getElementById("pre-year");
preYearButton.onclick = function () {
    getPreYearCalendar(selectDate);
}

//获取这个月下一年的日历
function getNextYearCalendar(selectDate) {
    selectDate.year++;
    if (!isLegalSelectDate(selectDate)) {
        return;
    }
    addNewMonthToCalendar(selectDate);
}
var nextYearButton = document.getElementById("next-year");
nextYearButton.onclick = function () {
    getNextYearCalendar(selectDate);
}

//获取下个月的日历
function getPreMonthCalendar(selectDate) {
    selectDate.month--;
    if (selectDate.month < 1) {
        selectDate.year--;
        if (!isLegalSelectDate(selectDate)) {
            selectDate.month++;
            return;
        }
        selectDate.month = 12;
    }
    addNewMonthToCalendar(selectDate);
}
var preMonthButton = document.getElementById("pre-month");
preMonthButton.onclick = function () {
    getPreMonthCalendar(selectDate);
}

//获取下个月的日历
function getNextMonthCalendar(selectDate) {
    selectDate.month++;
    if (selectDate.month > 12) {
        selectDate.year++;
        if (!isLegalSelectDate(selectDate)) {
            selectDate.month--;
            return;
        }
        selectDate.month = 1;
    }
    addNewMonthToCalendar(selectDate);
}
var nextMonthButton = document.getElementById("next-month");
nextMonthButton.onclick = function () {
    getNextMonthCalendar(selectDate);
}

//获取当天所属月的日历
function getTodayCalendar(selectDate) {
    var data = new Date();
    selectDate.year = data.getFullYear(),
        selectDate.month = data.getMonth() + 1;
    selectDate.day = data.getDate();
    addNewMonthToCalendar(selectDate);
}
var returnTodayButton = document.getElementById("return-today");
returnTodayButton.onclick = function () {
    getTodayCalendar(selectDate);
}

//选择月和年，为年月选择框的每项添加click事件
selectYearAndMonth(selectDate);
function selectYearAndMonth(selectDate) {
    for (var i = 0; i < selectDate.changeButton.length; i++) {
        selectDate.changeButton[i].onclick = function () {
            var changeNum = this.getAttribute("data-value");
            if (changeNum > 0 && changeNum < 13) {
                selectDate.month = parseInt(changeNum, 10);
                addNewMonthToCalendar(selectDate);
            } else if (changeNum >= 1900 && changeNum <= 2100) {
                selectDate.year = parseInt(changeNum, 10);//注意类型转换，这里被坑了
                addNewMonthToCalendar(selectDate);
            } else {
                return;
            }
        }
    }
}

//年月选择框内容显示和隐藏控制
function dropdownControl(dropdownMenu) {
    var visible = dropdownMenu.style.visibility;
    if (visible == "hidden") {
        dropdownMenu.style.visibility = "visible";
    } else {
        dropdownMenu.style.visibility = "hidden";
    }
}

//为年月选择框的开发添加click事件
function dropdownToggle(toggleClassName, controlContentClassName) {
    var dropdown = document.getElementsByClassName(toggleClassName);
    var dropdownMenu = document.getElementsByClassName(controlContentClassName);
    for (var i = 0; i < dropdown.length; i++) {
        dropdown[i].id = i;
        dropdownEvent = function () {
            dropdownControl(dropdownMenu[this.id]);
        };
        //IE9以下版本attachEvent事件处理程序作用域为window，这里必须采用DOM0级事件处理
        dropdown[i].onclick = dropdownEvent;
    }
}
dropdownToggle(selectDate.dropdownToggleClassName, selectDate.dropownControlContentClassName);



