// 腾讯面试题，单链表的反转
/* 
    实现思路：
        1. 先定义一个节点作为反转节点的头部：reverseHead = new HeroNode()
        2. 遍历原来的链表，每遍历一个节点，就将其取出放在新链表reverseHead的最前端
        3. 将原来的链表的head.next = reverseHead.next
*/

function reverseLinkList(headNode){
    // 有效节点为空或只有一个有效节点直接返回
    if(headNode.next == null || headNode.next.next == null)return
    // 准备临时变量保存第一个有效节点
    let temp = headNode.next
    // 准备临时变量保存temp的下一个节点
    let next = null
    // 准备用于反转的链表头节点
    let reverseHead = new heroNode()
    // 遍历旧链表
    while(temp != null){
        // 先保存当前节点的下一个节点
        next = temp.next
        // 将当前节点的下一个节点指向新链表的最前端
        temp.next = reverseHead.next
        // 将新链表的第一个节点指向temp节点(此时的temp.next = reverseHead.next)
        reverseHead.next = temp
        // 将当前节点后移
        temp = next
    }
    // 将原链表头节点的next指向新链表头节点的next
    headNode.next = reverseHead.next
}

export  default reverseLinkList
