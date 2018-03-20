// >> setting-url-webview
const Observable = require("tns-core-modules/data/observable").Observable;
const webViewModule = require("tns-core-modules/ui/web-view");
function onNavigatingTo(args) {
    const page = args.object;
    const vm = new Observable();
    vm.set("webViewSrc", "https://docs.nativescript.org/");
    vm.set("result", "");
    vm.set("tftext", "https://docs.nativescript.org/");
    page.bindingContext = vm;
}
// handling WebView load finish event
function onWebViewLoaded(webargs) {
    const page = webargs.object.page;
    const vm = page.bindingContext;
    const webview = webargs.object;
    vm.set("result", "WebView is still loading...");

    webview.on(webViewModule.WebView.loadFinishedEvent, (args) => {
        let message = "";
        if (!args.error) {
            message = `WebView finished loading of ${args.url}`;
        }
        else {
            message = `Error loading ${args.url} : ${args.error}`;
        }

        vm.set("result", message);
        console.log(`WebView message - ${message}`);
    });
}
// going to the previous page if such is available
function goBack(args) {
    const page = args.object.page;
    const webview = page.getViewById("myWebView");
    if (webview.canGoBack) {
        webview.goBack();
    }
}
// changing WebView source
function submit(args) {
    const page = args.object.page;
    const vm = page.bindingContext;
    const textField = args.object;
    const text = textField.text;
    if (text.substring(0, 4) === "http") {
        vm.set("webViewSrc", text);
        textField.dismissSoftInput();
    }
    else {
        alert("Please, add `http://` or `https://` in front of the URL string");
    }
}
exports.onNavigatingTo = onNavigatingTo;
exports.onWebViewLoaded = onWebViewLoaded;
exports.submit = submit;
exports.goBack = goBack;
// << setting-url-webview
