import Sidebar from '../components/Sidebar';
import ConversationList from './components/ConversationList';
import getConversation from '../actions/getConversation';
export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversation();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
