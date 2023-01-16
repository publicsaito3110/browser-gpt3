$(function(){

  // chat-GPT3.5のAPIキーを入力してください (https://beta.openai.com/account/api-keys)
  const CHATGPT_API_KEY = "API_KEY";
  
  //---------------------
	// フォーム入力時の処理
	//---------------------
  $("#prompt").on("input", function(){

		if (!$(this).val().trim()) {
			// フォームが入力されていないとき送信ボタンを非表示
			$("#btn").prop("disabled", true);
		} else {
			// フォームが入力されているとき送信ボタンを表示
			$("#btn").prop("disabled", false);
		}
  });


	//---------------------
	// ボタン押下時の処理
	//---------------------
	$("#btn").on("click", function (){

    var prompt = $("#prompt").val();

    if (!prompt) {
      alert("フォームが未入力です")
      return;
    }

    // ロードアイコンを表示
    $("#load-circle").css("display", "block");

		// 非同期通信
		$.ajax({
      type: 'POST',
      url: 'https://api.openai.com/v1/completions',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + CHATGPT_API_KEY
      },
      data: JSON.stringify({
        "model": "text-davinci-003",
        "prompt": prompt,
        "max_tokens": 500,
        "temperature": 0
      }),
      success: function(data) {

        // ロードアイコンを非表示
        $("#load-circle").css("display", "none");
        $("#chat-box").text("");

        // APIのレスポンス結果を取得
        var resultText = data.choices[0].text;

        // タイピング風のアニメーションで表示 (Itype.js)
        ityped.init(document.querySelector("#chat-box"), {
          strings: [resultText],
          typeSpeed:  150,
          loop: false,
          showCursor: false,
          disableBackTyping: false,
         });
      }, error: function(xhr, status, error) {
       alert(error);
      }
   });
  });
});