import { UserDetail } from "./_presenter/userDetail.presenter"

export default function UserContainer() {
    const item = {
        title: "Who am I?",
        content: "I am a software engineer."
    }
    return (
        <UserDetail item={item} />
    )
}