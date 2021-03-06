var LOADER_CONTAINER = $("#loader");
var LOADER_INTERVAL = 2750;
var LOADERS = [
    ["🍋", "تقويت قلب و اعصاب ، ضد تشنج ، ضد هيستري ، رفع افسردگي ، درمان بي خوابي و اختلالات عصبي ، رفع سکسه"],
    ["🍎", "مقوي معده ، رفع سردرد ، رفع بي خوابي ، مسکن دردهاي عصبي صورت و کمر ، رفع کم خوابي ، معطر و خوشبو کننده"],
    ["🍐", "چاق کننده ، مولد خون ، نيرو دهنده قواي جنسي ، تقويت عمومي بدن ، تامين استخوان بندي اطفال و درمان نرمي استخوان"],
    ["🍊", "تقويت کننده اعصاب ، ضد انگل ، ضد عفوني کننده مجاري تنفسي ، تقويت دستگاه گوارش ، تقويت بينايي ، درمان بي خوابي"],
    ["🍉", "  چاق کننده ، تب بر ، ضد آسم ، تسکين دهنده ضعف اعصاب ، پوست را جلا مي دهد ، درد و ورم را که از گرمي مزاج است تسکين مي دهد."],
    ["🍏", "برطرف کننده چربي خون ، ضد دل درد و بيماري هاي روده ، مقوي معده ، هضم کننده غذا ، آرام کننده و زياد کننده شيرمادران"],
    ["🍇", "     ضد تشنج ، محرک ، مسکن ، بادشکن ، رفع بي خوابي ، ضد هيستري ، ضد صرع ، مقوي اعصاب ، پايين آورنده فشار خون"],
    ["🍈", "تقويت معده ، رفع دل دردهاي ناشي از سردي مزاج و دل پيچه ، هضم غذا را آسان مي کند ."],
    ["🍒", "  ضد چاقي ، رفع ضعف اعصاب ، نيرو دهنده و هضم کننده ، درمان کم خوني ، زياد کننده ترشحات شير ، پايين آورنده چربي خون ، درمان اختلالات قاعدگي"],
    ["🍑", " تقويت معده ، رفع ترشي معده ، تقويت بينايي ، صد درد و تشنج ، رقيق کننده خون ، در عفونت هاي ريوي ، زکام و برونشيت بي همتاست ."],
    ["🥥", "   این دمنوش به علت خواص ضد التهاب و ضدعفونی کننده بسیار مناسب برای مقابله با سرماخوردگی و سرفه می باشد."],
    ["🥝", "طبیعت گرم و اثرآرام بخش مرزنجوش براعصاب،"],
    ["🍅", "برای شما که اهل دم‌نوش‌های ترش و میوه‌ای هستید."],
    ["🍆", "تیرگی دور چشم را رفع می کند."],
    ["🥒", "به طور موثر بیماری های قلبی عروقی، واریس و انسداد رگ ها را درمان می کند."],
    ["🥦", "با سم زدایی از کبد، میزان کلسترول بدن را کاهش می دهد."],
    ["🥑", "مصرف آن پس از یک روز کاری، خستگی را از تن بیرون می کند"],
    ["🥕", "با انگل‌ها مقابله می‌کند"],
    ["🥔", "برای درمان عفونت‌های گوش مفید است"],
    ["🍠", "برای درمان ورم ملتحمه چشم کاربرد دارد"],
    ["🥗", "دمنوش همیشه بهار را می‌توانید برای تسکین گلودرد و التهابات دهانی قرقره کنید"],
    ["🥘", "این دمنوش را می‌توان در یخچال نگه‌داری کرد و از آن برای نرم کردن پوست استفاده کرد"],
    ["🍣", "این دمنوش را می‌توان به طور مستقیم بر روی پوست ملتهب (آکنه، هموروئید و غیره) مالید"],
    ["🍱", "دمنوش گل پنیرک برای عفونت‌های مثانه، اسهال خونی موثر است"],
    ["🍡", "سیستم لنف بدن بدن را تمیز می کند"],
    ["🍢", "این گیاه ترشح زرداب و صفرا را تحریم مینماید و به کل فرآینده هضم کمک میکند"],
    ["🍬🍭🍫", "با نوشیدن دمنوش بلوبری می توانید پیری را تا حدی به تاخیر بیندازید"],
    ["🍪", "حافظه را نیز بهبود می بخشد"],
    ["🌰", " ورود میکروبی را به عروق سد می کند"],
    ["🥜", " درمان خونریزی سینه و تومور بدخیم"],
    ["🥡🥢", "هوالشافی"],
    ["👨‍👩‍👧‍👦", "دانه، برگ و ریشه جعفری استفاده دارویی دارد"],
    ["🐑", "این گیاه باعث بهبود عملکرد مغز و مرکز حافظه می‌شود. جینسنگ را می‌توان به چای روزانه اضافه کرد یا به طور جداگانه مصرف کرد تا این منافع را به دست آورد"],
    ["🐄", "محافظ در برابر اثرات مضر اشعه ها باز کننده رگ ها و جلوگیری  کننده از لخته شدن خون است"],
    ["🐪", "کاهش دهنده میل جنسی"],
    ["🎍", "صرف مخروط های رازک برای درمان و کاهش دردهای روماتیسم لنفاوی شفابخش است"],
    ["🌿", " کرم روده کودکان را از بین می‌برد."],
    ["🎋", "دمنوش رازیانه برونشیت را تسکین می‌دهد "],
    ["🌶", "دمنوش ریحان در درمان دردهای روده‌ای موثر است."],
    ["🍳", "مصرف دمنوش ریحان می‌تواند باعث بهبود چین و چروک های دست و صورت شود."],
    ["🧀", "دمنوش برگ ریحان برطرف کننده تورم گلو و گلو درد و آنژین است."],
    ["🥓", "در هنگام زایمان برای تسهیل و تسریع روند زایمان می توان یک مثقال آن را دم کرد"],
    ["🌽", " زیاده روی در مصرف آن می تواند باعث افزایش فشار خون و ضعف نیروی جنسی شود"],
    ["🍚", "استویا هم شیرین است است و هم برای دهان و دندان مفید است."],
    ["🍞", "خواب آور و موثر در درمان اگزمای پوستی است"],
    ["🍤", "      کاهش دهنده فشار خون"],
    ["🥐", " یبوست های مزمن را درمان می کند"],
    ["🍋", "مفید برای به تأخیر انداختن عادت ماهانۀ زنان"],
    ["🥕", "لازم نیست از چربی موجود در آووکادو بترسید، زیرا این میوه حاوی چربی‌های سالم اشباع نشده است"],
    ["🍲", "مصرف آب آناناس را به رژیم غذایی‌تان اضافه کنید"],
    ["🍵", "میوه‌ی جک فروت حاوی ترکیبات ارگانیکی است که نقش ضد سرطانی ایفا می‌کنند."],
    ["🍕", "می‌توانید از خرما به صورت خوراکی‌های لقمه‌ای جهت آموزش فرهنگ غذایی به آن‌ها استفاده کنید"],
    ["🔥", "مصرف آب معدنی برای نوزادان و کودکان کمتر از هفت سال و همچنین برای تهیه شیر خشک مناسب نیست"],
    ["🥔", " ویتامین موجود در شیر برای رشد کودکان بسیار حائز اهمیت است"],
    ["🍊", "پتاسیم موجود در موز نقش مهمی در شکل‌گیری ماهیچه ایفا می‌کند و باعث می‌شود بدن‌تان شکل ایده‌آلی پیدا کند"],
    ["💧", "مصرف بی‌رویه این نوشیدنی‌ها خطر‌ها و آسیب‌های جدی را به دنبال خواهد داشت"],
    ["🍦", "دوغ‌های با اسانس‌های نعنا، آویشن و... برای تشویق به مصرف دوغ مناسب هستند"],
    ["🍨", " یک لیوان آب پاپایا تهیه و نوش جان کنید تا مشکل‌تان برطرف شود"],
    ["🥗", "یک لیوان آب لیمو می‌تواند برای‌تان معجزه کند"],
    ["🥚", "در آلوچه املاحي چون آهن، كلسيم، فسفر، منيزيم، پتاسيم، سديم و منگنز مي باشد"],
    ["🥞", "منیزیم برای حفظ سلامت استخوان ها حیاتی است."],
    ["🍒", "خوردن روغن بادام زميني چون فاقد كلسترول است براي افرادي كه چربي خونشان بالاست مفيد مي‌باشد"],
    ["🍗", "بادام زميني برطرف كنندة سودا است."],
    ["🍅", "برای التیام زخم‌های روده و رفع ناراحتی معده از بلوط استفاده كنید."],
    ["🍍", "خوردن انجير قبل از غذا باعث تحريك اشتها مي‌شود و محيط را براي هضم غذا آسان مي‌كند"],
    ["📝", "فراد سالخورده از خوردن گلابي ترش خودداري كنند"],
    ["🌰", "برگ درخت هلو قلنج كليوي را تسكين مي‌دهد."],
    ["🍿", "كساني كه ريه‌هاي آزرده دارند انگور غذاي خوبي است"],
    ["🍆", "كساني كه يرقان دارند بعد از غذا ميل كنند"],
    ["🥑", " تخم خيار چنبر براي مرض سوزاك مفيد است"],
    ["🍌", "خرمالو آرام كنندة سكسكه است"],
    ["🍔", " ميوه نارس كيوي قابض مي‌باشد و ضد عطش است"],
    ["🍻", "جهت درمان ورم روده كنسرو ازگيل و يا مخلوطي از شير و ازگيل ميل شود"],
    ["🍴", "باز كنندة انسداد و گرفتگي مجاري كبد مي‌باشد"],
    ["🍪", "تخم بوداده و سرخ شده پرتقال محرك است"],
    ["🍣", "رنگ گوشت پرندگانی چون غازها و اردک‌ها که برای پرواز از سینه خود استفاده می‌کنند تیره‌تر است"],
    ["🍶", "این پرنده بزرگ هم درست مثل مرغ عضلاتتان را سرشار از پروتئین می‌کند"],
    ["🍱", " گوشت دنده در هر ۱۱ کالری یک گرم پروتئین دارد"],
    ["🌯", "از آنجایی که گوشت مرغ نسبت به گوشت های دیگر در همه جا به فراوانی یافت می شود اگر موارد بهداشتی آن را رعایت نکنید به بیماری های خطرناکی مبتلا می شوید"],
    ["☕️", "میزان آهن موجود در گوشت شترمرغ همسان با گوشت قرمز است"],
    ["🍏", "پوست‌تان را تمیز می‌کند و یک میان‌وعده‌ی کامل است"],
    ["🌿", "این ماهی که در بیشتر ماهی‌فروشی‌ها موجود است، طعمی ملایم داشته و مقدار قابل‌توجهی پروتئین برای عضلاتتان فراهم می‌کند"],
    ["🍰", "ندوانه‌ درد ماهیچه‌ها را تسکین می‌دهد"],
    ["🍟", "زیبایی را به صورت داخلی ارتقاء می‌دهد"],
    ["🍑", "دایره‌های تیره زیر چشم را کاهش‌می‌دهد"],
    ["🍛", "رنگدانه‌ها را پاک می‌کند"],
    ["🌮", "کچلی را درمان‌می‌کند"],
    ["🍫", "نخودفرنگی منبع خوبی از فیبر هست که اشتهایتان را کنترل می‌کند"],
    ["🍜", "اگر به دلایلی مثل عدم تحمل لاکتوز، قادر به مصرف شیر لبنی نیستید، از شیر سویا استفاده کنید"],
    ["🥖", "گریپ فروت می‌تواند به کنترل قند خون کمک کند"],
    ["🥛", "دارچین خاصیت ضدباکتریایی و ضدقارچی دارد که با آنفلوآنزا مقابله می کند"],
    ["🍄", "ریشه ریحان حاوی ترکیبی مشابه داروهای آلزایمراست"],
    ["🐟", "اما مصرف نمک یددار مهم ‌ترین ‌موارد بهداشتی برای از بین بردن اختلالات ناشی از کمبود یُد محسوب می ‌شود"],
    ["🍹", " فلفل سیاه در تسکین دردهای قاعدگی و کاهش انقباضات رحمی مفید است"],
    ["🌱", "گلوکز به صورت طبیعی در بسیاری از میوه‌ها و گیاهان و با غلظتی در گستره 0.08% تا 0.1% در خون انسان وجود دارد"],
    ["⚗️", "فروکتوز نیز در بسیاری از میوه‌ها و در عسل وجود دارد."],
]

$(document).ready(function () {

    var cycleLoader = function () {
        var index = Math.floor(Math.random() * LOADERS.length);
        var selected = LOADERS[index];
        var selectedEmoji = selected[0];
        var selectedText = selected[1];

        // First transition out the old loader
        setTimeout(function () {
            LOADER_CONTAINER.children().addClass("animateOut");
        }, LOADER_INTERVAL - 300); // This negative value should be the same as $animation-duration in the CSS

        // Then remove the animated out divs
        LOADER_CONTAINER.children(".emoji").last().remove();
        LOADER_CONTAINER.children(".text").last().remove();

        // Then animate in the new one
     //  LOADER_CONTAINER.append('<div class="emoji">' + selectedEmoji + '</div>');
        LOADER_CONTAINER.append('<div class="text">' + selectedText + '</div>');
    }

    setInterval(cycleLoader, LOADER_INTERVAL);
    cycleLoader(); // Run first time without delay

});