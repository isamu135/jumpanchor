# Jump to sections with a fixed header
##### Fixing a small issue the hard way


A couple of months ago, a colleage came with an issue that her customer wanted to navigate to another page to a certain section of a page. So normaly it would be like:

```
<a href="otherpage.html#id" title="go to page">Go to other page</a>
```

But the problem was that the webpage has a fixed header. So the top of the targeted section will be partially covered by the header.

## Solution
Some suggests to provide the sections with a huge padding top instead of margins. But I really don't like this solution. It's kind of abusing css to fit your needs. So I wrote this javascript solution while using parameters and data attributes.

Using data attributes has a few benefits:

* Bind functions using data-attributes instead the conventional way of using classes
* Configure functions in HTML instead of doing it in scripts (keep it generic)
* If you're using a CMS, this is very configurable by content managers
* Very versatile
* Pottentially get rid of using id's

What do I need?

* The targeted page. The conventional href will provide this
* Somewhere do declare the section I want to jump. Created data-target attribute for it
* The targeted section needs to be passed on the next page. Use parameters!
* The targeted page needs to know where to scroll. Add a listener to read the parameters
* Instead of declaring id, create a data attribute named data-id and declare it's name there
* The height of the header, so the page knows how much offset it should scroll to

### The HTML
The links would look like this
```
<a href="anime.html" data-target="onepiece">Jump to One Piece</a>
<a href="anime.html" data-target="gundam">Jump to Gundam</a>
<a href="anime.html" data-target="dbz">Jump to Dragon Ball Z
```
The targeted sections would look like this:
```
<section data-id="gundam">...</section>
```
I created the data-target attribute that has 2 functions: to bind the function to the anchor. And I can declare the targeted section in this attribute.

Here is the code that makes a regular anchor into a jump achor. What this basically does, it will prevent the anchor to navigate to the other page. It'll use javascript instead. It also has to pass on the target it wants to scroll to the next page. How? Using paramters. You know, the weird stuff behind the url in your address bar. It creates a new url and attach a parameter right behind it where the target section is declared

This solution requires JQuery because we'll be using the .data() function that can retreive any value of an data-attribute. Basically you can name it whatever whatever you want as long as you prefix it with "data-"
Examples:
```
<div id="first" data-example="alpha"></div>
<div id="second" data-test="beta"></div>
```
```
 $(#first).data("example");// will return "alpha"
 $(#second).data("test");// will return "beta"
```

## The scripts
Set? Let's do this!

The function here will hijack the anchors behaviour and replace it with something else.
```
jumpAnchor : function() {
    //This will look at each anchor if it's got a data-target
    $("a").each(function() {
    if ($(this).data("target") !== undefined) {
        $(this).on("click", function(event) { //binds the click fucntion
            event.preventDefault(); //prevents it from going to the link
            var pageUrl = $(this).attr("href"); //retrieve it's destination page
            var pageTarget = $(this).data("target"); //retrieve it's target
            var targetUrl = pageUrl+"?target="+pageTarget; //create url with query param
            window.location.href=targetUrl;// Navigates to the newly created url
        });
    }
};
```

So the target is passed on by adding a parameter to the url. What's next?  Using the following snippet, you'll be able to retrieve what parameters there are in the url
```
queryparams : function(){
    var p = window.location.search.substr(1).split(/\&/), l = p.length, kv, r = {};
    while(l--){
        kv = p[l].split(/\=/);
        r[kv[0]] = kv[1] || ''; //if no =value just set it as true
    }
    return r;
};
```
So the page needs to scroll to the target. Call the following script after the document is loaded. Documented needs to be fully loaded, because in order to get the accurate position of a section all objects (i.e. images) must be fully loaded first:
```
jumpTarget : function() {
    //This function uses the query parameters to determine the target
    //window.load because all images needs to be loaded first to aqcuire an accurate position
    $(window).load(function(){
        if (main.queryparams().target !== undefined ){
            var targetId = main.queryparams().target; //retrieve the target's id by calling the queryparams function
            var targetPos = $(document.body).find("[data-id='" + targetId +"']").position().top; //retrieve target's position
            var navHeight = $("header").height(); // get height of the navbar 
            var scrollPos = targetPos - navHeight ; // target’s position - navbar height. If you want, you can add extra margin here.
            window.scrollTo(0, scrollPos); //scrolls the window to it's position
        }     
    });
};

```

Don't forget to add JQuery to your project!


Thanx for reading



