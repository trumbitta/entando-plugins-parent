<%@ taglib prefix="jpph" uri="/jpphotogallery-aps-core" %>
<%@ taglib prefix="jacms" uri="/jacms-aps-core" %>
<%@ taglib prefix="wp" uri="/aps-core" %>
<%@ taglib prefix="c" http://java.sun.com/jsp/jstl/core %>

<wp:currentShowlet param="config" configParam="modelIdMaster" var="modelIdMaster" />
<wp:currentShowlet param="config" configParam="modelIdPreview" var="modelIdPreview" />

<jacms:contentList listName="contentList" /> 

<c:if test="${contentList != null}">
	<wp:headInfo type="CSS" info="../../plugins/jpphotogallery/jpphotogallery.css"/>
	<div class="jpphotogallery">
	<h2 class="title"><wp:i18n key="jpphotogallery_TITLE" /> </h2>
	<jpph:pager listName="contentList" objectName="groupContent" max="1" advanced="true" offset="5" >
		<c:set var="group" value="${groupContent}" scope="request" />
		
		<%--  paginatore alto --%>
		<c:import url="/WEB-INF/plugins/jpphotogallery/aps/jsp/showlets/inc/jpphotogallery_pagerBlock.jsp" />
		<%--  paginatore alto--%>
		
		<%-- lista immagini precedenti start--%>
		<c:if test="${groupContent.begin > 0}">
				
				<h3 class="noscreen"><wp:i18n key="jpphotogallery_PREV_IMAGES" /></h3>
				
				<ul class="thumbnails">
				<%-- controllo sulla lista delle immagini precedenti --%>
				<c:set var="precedentiBegin" value="${groupContent.begin - 3}" />
				<c:if test="${precedentiBegin < 0}"><c:set var="precedentiBegin" value="0" /></c:if>
				<c:set var="precendentiEnd" value="${groupContent.end - 1}" />
				<c:if test="${precendentiEnd < 0}"><c:set var="precendentiEnd" value="0" /></c:if>
				<%-- fine controllo sulla lista delle immagini precedenti --%>
				
				<c:forEach var="content" items="${contentList}" begin="${precedentiBegin}" end="${precendentiEnd}" varStatus="status">
					<%-- controllo per stabilire qual'e' l'immagine anteprima di inizio e quella di fine --%>
					<li  class="img_preview_<c:out value="${status.count}" />">
					<jacms:content contentId="${content}" modelId="${modelIdPreview}" />
					</li>
					<%-- fine controllo end  --%>
				</c:forEach>
				</ul>
		</c:if>
		<%-- lista immagini precedenti --%>
		
		<%--  immagine centrale start --%>
			<c:forEach var="content" items="${contentList}" begin="${groupContent.begin}" end="${groupContent.end}">
				<div class="main_image">
					<jacms:content contentId="${content}" modelId="${modelIdMaster}" />
				</div>
			</c:forEach>
		<%--  immagine centrale end --%>
		
		<%--  lista immagini successive start --%>
		<c:if test="${(groupContent.size-groupContent.end - 1)>0}">
			<h3 class="noscreen"><wp:i18n key="jpphotogallery_NEXT_IMAGES" /></h3>
			<ul class="thumbnails">
				<c:forEach var="content" items="${contentList}" begin="${groupContent.end + 1}" end="${groupContent.end + 3}" varStatus="status" >
					<%-- controllo per stabilire qual'e' l'immagine anteprima di inizio e quella di fine --%>
						<%-- controllo per stabilire qual'e' l'immagine anteprima di inizio e quella di fine --%>
						<li  class="img_preview_<c:out value="${status.count}" />">
						<jacms:content contentId="${content}" modelId="${modelIdPreview}" />
						</li>
						<%-- fine controllo end  --%>
				<%-- fine controllo --%>
				</c:forEach>
			</ul>
		</c:if>
		<%--  lista immagini successive end--%>
		
		
		<%--  paginatore basso --%>
		<c:import url="/WEB-INF/plugins/jpphotogallery/aps/jsp/showlets/inc/jpphotogallery_pagerBlock.jsp" />
		<%--  paginatore basso--%>
	
		
	</jpph:pager>
</div>
</c:if>	