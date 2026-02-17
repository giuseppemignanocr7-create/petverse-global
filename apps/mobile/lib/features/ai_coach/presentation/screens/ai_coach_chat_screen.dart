import 'package:flutter/material.dart';
import '../../../../config/theme.dart';

class AiCoachChatScreen extends StatefulWidget {
  const AiCoachChatScreen({super.key});

  @override
  State<AiCoachChatScreen> createState() => _AiCoachChatScreenState();
}

class _AiCoachChatScreenState extends State<AiCoachChatScreen> {
  final _messageController = TextEditingController();
  final _scrollController = ScrollController();
  final List<_ChatMessage> _messages = [];
  bool _isTyping = false;

  @override
  void initState() {
    super.initState();
    _messages.add(_ChatMessage(
      content: 'Ciao! Sono il tuo AI Coach PetVerse. Come posso aiutarti oggi con il tuo pet?',
      isUser: false,
      timestamp: DateTime.now(),
      suggestions: ['Consigli alimentazione', 'Il mio pet sembra stanco', 'Calendario vaccini'],
    ));
  }

  @override
  void dispose() {
    _messageController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  Future<void> _sendMessage([String? text]) async {
    final content = text ?? _messageController.text.trim();
    if (content.isEmpty) return;

    setState(() {
      _messages.add(_ChatMessage(content: content, isUser: true, timestamp: DateTime.now()));
      _messageController.clear();
      _isTyping = true;
    });

    _scrollToBottom();

    // TODO: Call AI service
    await Future.delayed(const Duration(seconds: 2));
    if (!mounted) return;

    setState(() {
      _isTyping = false;
      _messages.add(_ChatMessage(
        content: 'Grazie per la tua domanda! Al momento sto funzionando in modalità demo. '
            'Quando il backend sarà configurato con la chiave OpenAI, potrò darti consigli personalizzati per il tuo pet.',
        isUser: false,
        timestamp: DateTime.now(),
        suggestions: ['Dimmi di più', 'Altro argomento'],
      ));
    });

    _scrollToBottom();
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            CircleAvatar(
              radius: 18,
              backgroundColor: PetVerseColors.primaryTeal.withOpacity(0.1),
              child: const Icon(Icons.smart_toy, size: 20, color: PetVerseColors.primaryTeal),
            ),
            const SizedBox(width: PetVerseSpacing.s),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('AI Coach', style: PetVerseTextStyles.titleMedium),
                Text(_isTyping ? 'Sta scrivendo...' : 'Online',
                    style: PetVerseTextStyles.labelSmall.copyWith(color: PetVerseColors.success)),
              ],
            ),
          ],
        ),
        actions: [
          PopupMenuButton(
            itemBuilder: (context) => [
              const PopupMenuItem(value: 'new', child: Text('Nuova conversazione')),
              const PopupMenuItem(value: 'insights', child: Text('Insight AI')),
              const PopupMenuItem(value: 'triage', child: Text('Triage sintomi')),
            ],
            onSelected: (value) {
              if (value == 'new') {
                setState(() {
                  _messages.clear();
                  _messages.add(_ChatMessage(
                    content: 'Nuova conversazione iniziata. Come posso aiutarti?',
                    isUser: false,
                    timestamp: DateTime.now(),
                  ));
                });
              }
            },
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.symmetric(vertical: PetVerseSpacing.m),
              itemCount: _messages.length + (_isTyping ? 1 : 0),
              itemBuilder: (context, index) {
                if (index == _messages.length && _isTyping) {
                  return _buildTypingIndicator();
                }
                return _buildMessageBubble(_messages[index]);
              },
            ),
          ),
          _buildInputBar(),
        ],
      ),
    );
  }

  Widget _buildMessageBubble(_ChatMessage message) {
    return Align(
      alignment: message.isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: EdgeInsets.only(
          left: message.isUser ? 64 : PetVerseSpacing.m,
          right: message.isUser ? PetVerseSpacing.m : 64,
          bottom: PetVerseSpacing.s,
        ),
        child: Column(
          crossAxisAlignment: message.isUser ? CrossAxisAlignment.end : CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(PetVerseSpacing.m),
              decoration: BoxDecoration(
                color: message.isUser ? PetVerseColors.primaryTeal : PetVerseColors.neutralGray100,
                borderRadius: BorderRadius.circular(PetVerseRadius.m).copyWith(
                  bottomRight: message.isUser ? Radius.zero : null,
                  bottomLeft: message.isUser ? null : Radius.zero,
                ),
              ),
              child: Text(
                message.content,
                style: PetVerseTextStyles.bodyMedium.copyWith(
                  color: message.isUser ? Colors.white : Colors.black87,
                ),
              ),
            ),
            if (message.suggestions != null && message.suggestions!.isNotEmpty) ...[
              const SizedBox(height: PetVerseSpacing.xs),
              Wrap(
                spacing: PetVerseSpacing.xs,
                runSpacing: PetVerseSpacing.xs,
                children: message.suggestions!.map((s) => ActionChip(
                  label: Text(s, style: PetVerseTextStyles.labelSmall),
                  onPressed: () => _sendMessage(s),
                  backgroundColor: PetVerseColors.primaryTeal.withOpacity(0.1),
                  side: BorderSide.none,
                )).toList(),
              ),
            ],
            const SizedBox(height: 2),
            Text(
              '${message.timestamp.hour.toString().padLeft(2, '0')}:${message.timestamp.minute.toString().padLeft(2, '0')}',
              style: PetVerseTextStyles.labelSmall.copyWith(color: PetVerseColors.neutralGray500),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTypingIndicator() {
    return Align(
      alignment: Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.only(left: PetVerseSpacing.m, bottom: PetVerseSpacing.s),
        padding: const EdgeInsets.all(PetVerseSpacing.m),
        decoration: BoxDecoration(
          color: PetVerseColors.neutralGray100,
          borderRadius: BorderRadius.circular(PetVerseRadius.m),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: List.generate(3, (i) => Padding(
            padding: const EdgeInsets.symmetric(horizontal: 2),
            child: _AnimatedDot(delay: i * 200),
          )),
        ),
      ),
    );
  }

  Widget _buildInputBar() {
    return Container(
      padding: const EdgeInsets.all(PetVerseSpacing.m),
      decoration: BoxDecoration(
        color: Theme.of(context).scaffoldBackgroundColor,
        boxShadow: PetVerseElevation.level2,
      ),
      child: SafeArea(
        top: false,
        child: Row(
          children: [
            IconButton(
              icon: const Icon(Icons.attach_file),
              color: PetVerseColors.neutralGray500,
              onPressed: () {/* TODO: Attach photo */},
            ),
            Expanded(
              child: TextField(
                controller: _messageController,
                decoration: InputDecoration(
                  hintText: 'Scrivi un messaggio...',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(PetVerseRadius.full),
                    borderSide: BorderSide.none,
                  ),
                  filled: true,
                  fillColor: PetVerseColors.neutralGray100,
                  contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                ),
                textInputAction: TextInputAction.send,
                onSubmitted: (_) => _sendMessage(),
              ),
            ),
            const SizedBox(width: PetVerseSpacing.s),
            CircleAvatar(
              backgroundColor: PetVerseColors.primaryTeal,
              child: IconButton(
                icon: const Icon(Icons.send, color: Colors.white, size: 20),
                onPressed: () => _sendMessage(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ChatMessage {
  final String content;
  final bool isUser;
  final DateTime timestamp;
  final List<String>? suggestions;

  _ChatMessage({
    required this.content,
    required this.isUser,
    required this.timestamp,
    this.suggestions,
  });
}

class _AnimatedDot extends StatefulWidget {
  final int delay;
  const _AnimatedDot({required this.delay});

  @override
  State<_AnimatedDot> createState() => _AnimatedDotState();
}

class _AnimatedDotState extends State<_AnimatedDot> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(milliseconds: 600))
      ..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _controller,
      child: Container(
        width: 8,
        height: 8,
        decoration: const BoxDecoration(
          color: PetVerseColors.neutralGray500,
          shape: BoxShape.circle,
        ),
      ),
    );
  }
}
