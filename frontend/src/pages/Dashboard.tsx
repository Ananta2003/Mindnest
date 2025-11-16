import { useState } from "react"
import { ContentModal } from "../components/ContentModal"
import { Button } from "../components/Button"
import { ButtonFile } from "../icons/ButtonFile"
import { ButtonCreate } from "../icons/ButtonCreate"
import { Card } from "../components/Card"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"

interface ContentItem {
    id: string;
    title: string;
    type: "youtube" | "twitter";
    link: string;
}

export const Dashboard = () => {
    const [modalOpen, setmodalOpen] = useState(false)

    const [type, settype] = useState("")

    function addEvent(type: string) {
        if (type === "youtube") {
            return settype("youtube")
        } else {
            return settype("twitter")
        }
    }
    const contents: ContentItem[] = useContent();

    const youtubeContents =
        type === "youtube"
            ? contents.filter((item) => item.type === "youtube")
            : contents;

    const twitterContents =
        type === "twitter"
            ? contents.filter((item) => item.type === "twitter")
            : contents;

return <div>
        <Sidebar onDataSend={addEvent} />
        <div className='bg-gray-200 ml-72 min-h-screen'>
            <ContentModal open={modalOpen} onClose={() => {
                setmodalOpen(false)
            }} />

            <div className='flex gap-4 p-4 justify-end'>
                <Button variant='secondary' size='md' startIcon={<ButtonFile />} text='Share' />
                <Button variant='primary' size='md' startIcon={<ButtonCreate />} text='Add Content' onClick={() => setmodalOpen(true)} />

            </div>

            <div className='flex flex-wrap'>
                {
                    type === "youtube" && youtubeContents.map(({ id, title, type, link }) => (
                        <Card key={id} type={type} text={title} link={link} id={id} />
                    ))||
                    type === "twitter" && twitterContents.map(({ id, title, type, link }) => (
                        <Card key={id} type={type} text={title} link={link} id={id} />
                    ))
                    || contents.map(({ title, type, link,id}) =>
                        <Card type={type} text={title} link={link} key={id} id={id} />)

                }

            </div>

        </div>
    </div>

} 