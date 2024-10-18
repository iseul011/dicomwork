package com.study.finalProject.controller;



import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.study.finalProject.domain.Member;
import com.study.finalProject.service.MemberService;

import jakarta.servlet.http.HttpSession;




@Controller
@SessionAttributes({"loginUser"})
@RequestMapping("/members")
public class MemberController {

	@Autowired
    private MemberService memberService;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	HttpSession session;

   

    // 모든 회원 목록 페이지
    @GetMapping
    public String getAllMembers(Model model) {
        List<Member> members = memberService.getAllMembers();
        model.addAttribute("members", members);
        return "memberList"; // 타임리프 템플릿 파일 이름 (memberList.html)
    }

    // 특정 회원 상세 페이지
    @GetMapping("/{id}")
    public String getMemberById(@PathVariable String id, Model model) {
        memberService.getMemberById(id).ifPresent(member -> model.addAttribute("member", member));
        return "memberDetail"; // 타임리프 템플릿 파일 이름 (memberDetail.html)
    }

    // 회원 추가 폼 페이지
    @GetMapping("/new")
    public String createMemberForm(Model model) {
        model.addAttribute("member", new Member());
        return "createMember"; // 타임리프 템플릿 파일 이름 (createMember.html)
    }

    // 회원 추가/수정 처리
    @PostMapping
    public String saveOrUpdateMember(Member member) {
        memberService.saveOrUpdateMember(member);
        return "redirect:/members";
    }

    // 회원 삭제
    @PostMapping("/{id}/delete")
    public String deleteMember(@PathVariable String id) {
        memberService.deleteMember(id);
        return "redirect:/members";
    }
    
    
    @GetMapping("/idCheck")
	public @ResponseBody boolean checkId(@RequestParam("id") String id) {
		return memberService.idCheck(id);
	}
    
//    
//    @PostMapping("/login")
//	public String login(Member member, Model model) {
//		System.out.println("로그인 컨트롤러 메소드 실행확인 member : " + member);
//		Optional<Member> loginUser = memberService.login(member);
//		if(loginUser.isPresent()) {
//			Member m = loginUser.get();
//			if(passwordEncoder.matches(member.getPassword(), m.getPassword())) { // passwordEncoder.matches(input비번, DB비번) : 입력한 비번과 db비번이 맞는지 비교해주는 메소드
//				model.addAttribute("loginUser",m);	// model은 requestScope임 loginUser를 세션에 담으려면 위쪽에 세션으로 바꿔주는 @SessionAttributes({"loginUser"}) 어노테이션을 사용
//			}
//		}
//		String url = (String)session.getAttribute("boardDetailUrl");
//		if(url == null) {
//			url = "studyList";
//		}
//		return "redirect:"+url;
//	}
    
    
    
    
}
