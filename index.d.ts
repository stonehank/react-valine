import * as React from 'react'
declare module 'react-valine' {

    interface Lang{
        head?: {
            nick?:string,
            mail?:string,
            link?:string,
            require?:string,
            website?:string,
            change_avatar?:string,
        },
        tips?: {
            count?:string,
            pageview?:string,
            placeholder?:string,
            comments?: [string,string],
            sofa?:string,
        },
        ctrl?: {
            reply?:string,
            submit?:string,
            edit?:string,
            save?:string,
            cancel?:string,
            discuss?:string,
            comment_list?:string,
            collapse_comment?:string,
            more?:string,
            no_more?:string,
            preview?:string,
            preview_on?:string,
            preview_off?:string,
            emoji?:string,
        },
        error?: {
            100?:string,
            401?:string,
            403?:string,
            importError?:string,
            initError?:string,
            noCommentError?:string,
        },
        timeago?: {
            seconds?:string,
            minutes?:string,
            hours?:string,
            days?:string,
            months?:string,
            now?:string,
        },
        verify?:{
            empty_content?:string,
            exceed_content?:string,
            require_nick?:string,
            require_mail?:string,
            email_format_failed?:string,
            link_format_failed?:string,
            some_filed_error?:string,
        }
    }
    interface ValineProps{
        appId: string,
        appKey: string,
        requireName?:boolean,
        requireEmail?:boolean,
        nest?:boolean,
        pagesize?:number,
        previewShow?:boolean,
        lang?:'zh-cn'| 'en',
        placeholder?:string,
        sofaEmpty?:string,
        customTxt?:Lang,
        nestLayers?:number,
        emojiListSize?:number,
        editMode?:boolean,
        CommentClass?:string,
        CounterClass?:string,
        themeMode?:string
    }
    interface ValinePanelProps{
        useWindow?:boolean,
        getPanelParent?: () => HTMLElement,
        themeMode?:string,
        className?:string,
        style?:object,
    }
    interface ValineCountProps{
        count?:string | number,
        style?:object,
        uniqStr?:any,
        themeMode?:string,
        className?:string,
    }
    interface ValinePageviewProps extends  ValineCountProps{
        title?:string,
    }
    type hljs=any
    function modify_hljs(enhance_hljs:(hljs)=>hljs):void


    class Valine extends React.Component<ValineProps>{}
    class ValinePanel extends React.Component<ValinePanelProps>{}
    class ValineCount extends React.Component<ValineCountProps>{}
    class ValinePageview extends React.Component<ValinePageviewProps>{}



    export {Valine, ValineCount, ValinePanel,ValinePageview, modify_hljs}
}
