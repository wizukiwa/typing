//変数の初期化
let untyped = '';
let typed = '';
let score = 0;

//必要なhtml要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');

//複数のテキストを格納する配列
const textLists = [
    'momo','nasi','suika','meron','kiui','gure-pufuru-tu','budou','mikan','itigo','banana','itiziku'
];

// ランダムなテキストを表示
const createText = () => {

    //正タイプした文字列をクリア
    typed = '';
    typedfield.textContent =typed;

    //配列のインデックス数からランダムな数値を生成する
    let random =Math.floor(Math.random()*textLists.length);

    //配列からランダムにテキストを取得し画面に表示する
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};

// 関数createTextの呼び出し
createText();

// キー入力の判定
const keyPress = e => {
    //誤タイプの場合
    if(e.key !== untyped.substring(0,1)){
        wrap.classList.add('mistyped');//cssのmistypedをwrapに追加
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        },100);
        return;//終了
    }

    //正タイプの場合
    //スコアのインクリメント
    score++;
    wrap.classList.remove('mistyped');
    typed += untyped.substring(0,1); //typed = typed + untyped.substring(0, 1);
    untyped = untyped.substring(1); 
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    //テキストがなくなったら新しいテキストを表示
    if(untyped === ''){
        createText();
    }
};


//タイピングスキルを判定
const rankCheck = score => {

    //スコアの値を返す
    return `${score}文字打てました！`;
};

//ゲームを終了
const gameOver = id => {
    clearInterval(id);

    console.log('ゲーム終了');
    const result = confirm(rankCheck(score));
};

//カウントダウンタイマー
const timer = () => {

    //タイマー部分のhtml要素（p要素）を取得する
    let time = count.textContent;//id = countのテキストをtime変数に入れる

    const id = setInterval(() => {

        //カウントダウンする
        time--;//一秒ずつ減らす
        count.textContent = time;

        //カウントが0になったらタイマーを停止する
        if(time <= 0){
            gameOver(id);
        }
    },1000);
};

//ゲームスタート時の処理
start.addEventListener('click',() => {

    //カウントダウンタイマーを開始する
    timer();

    //ランダムなテキストを表示する
    createText();

    //「スタート」ボタンを非表示する
    start.style.display = 'none';

    //キーボードのイベント処理
    document.addEventListener('keypress',keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';